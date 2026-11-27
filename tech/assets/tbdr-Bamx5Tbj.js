const e={sections:[{h:"왜 모바일 GPU는 타일로 그리는가",body:`<p>데스크톱 GPU의 전통적인 방식(즉시 렌더링, IMR)은 삼각형이 들어오는 순서대로 바로 픽셀을 칠합니다. 프래그먼트마다 프레임버퍼의 깊이를 읽고, 통과하면 깊이와 컬러를 씁니다. 프레임버퍼는 DRAM(비디오 메모리)에 있으므로 오버드로가 많을수록, MSAA 샘플이 많을수록 메모리 트래픽이 늘어납니다. 데스크톱 GPU는 캐시·압축과 수백 GB/s의 넓은 메모리 버스로 이것을 감당합니다.</p>
<p>폰에는 그런 버스도, 전력 여유도 없습니다. 외부 DRAM 접근은 칩 안의 SRAM 접근보다 <b>바이트당 에너지가 훨씬 큽니다</b>(흔히 수십 배 수준으로 언급됩니다). 그래서 Arm Mali, Qualcomm Adreno, Apple GPU, Imagination PowerVR 같은 모바일 GPU는 화면을 작은 타일(흔히 16×16~32×32 픽셀 수준, 구현마다 다름)로 나누고, <b>한 타일의 모든 프래그먼트를 칩 안의 타일 메모리에서 끝낸 뒤</b> 결과만 DRAM에 한 번 씁니다. 모바일에서 대역폭은 곧 <b>전력과 발열</b>입니다.</p>
<p>이름의 "Deferred"는 구현마다 의미가 조금 다릅니다. PowerVR·Apple GPU는 타일 안의 불투명 프래그먼트를 셰이딩하기 전에 가려진 것을 걸러 내는 <b>HSR(Hidden Surface Removal)</b>을 하므로 불투명 오버드로의 셰이딩 비용까지 줄입니다. Adreno는 같은 계열의 구조를 <b>비닝(binning) 렌더링</b>이라고 부르며, 상황에 따라 직접 렌더링 모드로 전환하기도 합니다.</p>`},{h:"한 프레임의 흐름: 비닝 → 타일마다 Load · 셰이딩 · Store",body:`<ol>
<li><b>비닝(타일링) 패스</b>: 렌더 패스의 모든 드로우의 정점을 먼저 변환하고, 각 삼각형이 걸치는 타일 목록(파라미터 버퍼 / 빈 목록)을 DRAM에 씁니다. 첫 번째 뷰어 맨 앞의 회색 구간입니다.</li>
<li><b>Load 액션</b>: 타일 하나를 시작할 때 첨부물(컬러·깊이·스텐실)마다 무엇으로 채울지 정합니다. <code>CLEAR</code>는 칩 안에서 값만 채우고, <code>LOAD</code>는 DRAM의 이전 내용을 읽어 오며, <code>DONT_CARE</code>는 아무것도 하지 않습니다(내용은 정의되지 않음).</li>
<li><b>셰이딩</b>: 그 타일에 걸친 삼각형만 래스터화합니다. 깊이 테스트, 블렌딩, MSAA 샘플 저장이 전부 타일 메모리에서 일어나므로 오버드로가 늘어도 DRAM 트래픽은 늘지 않습니다(텍스처 읽기는 예외).</li>
<li><b>Store 액션</b>: 타일이 끝나면 첨부물마다 <code>STORE</code>(DRAM에 씀), <code>DONT_CARE</code>(버림), 또는 MSAA <b>resolve</b>(샘플을 평균해 1x로만 씀)를 고릅니다.</li>
<li>모든 타일을 반복하면 프레임 하나가 끝납니다. 렌더 패스가 바뀔 때마다(다른 렌더 타깃) 이 과정이 처음부터 다시 시작됩니다.</li>
</ol>
<p>세 시나리오 뷰어의 오른쪽 다이어그램은 칩 안의 타일 메모리와 DRAM 사이를 오가는 바이트를, 아래 타임라인은 같은 GPU 시간 축에서 각 단계가 차지하는 비율을 보여 줍니다.</p>`},{h:"바이트 계산 (이 페이지의 단순 모델)",body:`<pre><code>P = 가로 × 세로 픽셀, S = MSAA 샘플 수
컬러 1x       = P × 4바이트 (RGBA8)      1080p ≈ 8.3MB
컬러 S샘플    = P × 4 × S                4x   ≈ 33MB
깊이·스텐실   = P × 4 × S (D24S8)        4x   ≈ 33MB

좋은 설정   : Store 1x 컬러만            ≈ 8.3MB
전부 L/S    : (컬러S + 깊이S) × 2 + resolve(컬러S 읽기 + 1x 쓰기)
              4x 1080p ≈ 133 + 41 ≈ 174MB
RT 전환 1회 : (컬러S + 깊이S) 저장 + 다시 읽기 ≈ 133MB (4x 1080p)

60fps 대역폭 = MB/프레임 × 60     (182MB → 약 11GB/s)
DRAM 전력   ≈ 바이트/s × pJ/바이트 (가정 60pJ/B → 11GB/s ≈ 0.65W)
GPU 시간    ≈ 비닝 + 셰이딩 + DRAM 바이트 ÷ 유효 대역폭(가정 25GB/s)</code></pre>
<p>공통 항목(비닝 5MB, 텍스처 읽기 ≈ P × 오버드로 × 0.6바이트)은 세 방식에 같게 들어갑니다. 실제 GPU는 Load/Store와 셰이딩을 어느 정도 겹쳐 실행하고, 프레임버퍼 압축(Arm AFBC, Adreno UBWC 등)이 바이트를 더 줄이므로 숫자 자체보다 <b>비율</b>을 보시기 바랍니다. MSAA 4x에서 깊이를 STORE 한 번 하는 것만으로도 화면 한 장(1x 컬러)의 네 배를 쓰게 됩니다.</p>`},{h:"API와 엔진에서 실제로 쓰는 방법",body:`<ul>
<li><b>Vulkan</b>: <code>VkAttachmentDescription</code>의 <code>loadOp</code>(CLEAR/LOAD/DONT_CARE)와 <code>storeOp</code>(STORE/DONT_CARE)를 첨부물마다 지정합니다. MSAA 첨부물과 깊이는 <code>TRANSIENT_ATTACHMENT</code> 용도 + <code>LAZILY_ALLOCATED</code> 메모리로 만들면 실제 메모리가 거의 할당되지 않을 수 있고, resolve 첨부물로 타일 안에서 resolve합니다. <b>서브패스</b>와 input attachment로 G-버퍼를 DRAM에 내보내지 않고 같은 타일에서 다음 단계가 읽게 할 수 있습니다.</li>
<li><b>Metal</b>: <code>MTLLoadAction</code>/<code>MTLStoreAction</code>(<code>.multisampleResolve</code> 포함), <code>MTLStorageMode.memoryless</code> 텍스처, 프래그먼트 셰이더가 현재 픽셀의 컬러를 읽는 <b>programmable blending</b>, 타일 셰이더(Apple GPU).</li>
<li><b>OpenGL ES</b>: 명시적 Load/Store가 없어 드라이버가 추측합니다. 프레임 시작에 <code>glClear</code>(모든 첨부물)를 부르고, 끝에 <code>glInvalidateFramebuffer</code>로 깊이·스텐실을 버리겠다고 알려 주는 것이 관례입니다. 같은 픽셀의 프레임버퍼를 읽는 <b>framebuffer fetch</b> 확장(EXT_shader_framebuffer_fetch, ARM 계열 확장)도 있습니다.</li>
<li><b>엔진</b>: Unity URP와 UE 모바일 렌더러는 렌더 패스·서브패스(네이티브 렌더 패스)를 묶어 Load/Store를 최적화하려고 하며, 불필요한 중간 패스(예: 화면 복사, 후처리마다 별도 타깃)를 줄이는 설정을 제공합니다. 구체적인 옵션 이름은 엔진 버전마다 달라지므로 해당 버전 문서를 확인하는 것이 좋습니다.</li>
<li><b>확인 도구</b>: Arm Mobile Studio(Streamline, Performance Advisor), Snapdragon Profiler, Xcode의 Metal 디버거·GPU 카운터, Android GPU Inspector, RenderDoc으로 렌더 패스별 Load/Store와 외부 메모리 읽기/쓰기 바이트를 볼 수 있습니다.</li>
</ul>`},{h:"비용과 모바일 실무 체크리스트",body:`<ul>
<li>프레임마다 화면 전체를 그린다면 컬러·깊이 모두 <b>CLEAR</b>(또는 DONT_CARE)로 시작합니다. "어차피 다 덮어쓰니 Load든 Clear든 같다"가 아닙니다. LOAD는 실제로 DRAM을 읽습니다.</li>
<li>깊이·스텐실, MSAA 샘플은 거의 항상 <b>DONT_CARE / memoryless</b>. 후처리에서 깊이가 필요하면 그때만 저장하고, 가능하면 같은 패스(서브패스·framebuffer fetch) 안에서 해결합니다.</li>
<li>렌더 패스 개수를 셉니다. 그림자·반사 같은 오프스크린 타깃은 <b>메인 패스 앞에 몰아서</b> 그리고, 메인 패스를 쪼개는 중간 전환(그랩 패스, 불투명 텍스처 복사, 굴절용 화면 복사)을 최소화합니다.</li>
<li>CPU 리드백(<code>glReadPixels</code>, 동기식 쿼리 결과 대기)은 렌더링 도중에 하지 않습니다. 꼭 필요하면 PBO·펜스로 몇 프레임 늦게 비동기로 받습니다.</li>
<li>대역폭은 발열로 이어지고, 발열은 몇 분 뒤 클럭 하락(스로틀링)으로 이어집니다. 초반 FPS가 같아도 DRAM 트래픽이 큰 쪽이 먼저 느려집니다.</li>
</ul>`},{h:"이웃 기술과의 관계",body:`<ul>
<li><b>오버드로 · 필레이트</b>: TBDR은 오버드로의 <i>대역폭</i>을 온칩으로 흡수하지만, 반투명 프래그먼트의 <i>셰이딩</i> 비용은 그대로입니다. HSR도 불투명에만 도움이 됩니다.</li>
<li><b>모바일 발열 · 스로틀링</b>: DRAM 전력은 SoC 발열 예산을 직접 갉아먹습니다.</li>
<li><b>디퍼드 렌더링</b>: G-버퍼를 DRAM에 쓰고 다시 읽는 고전적인 디퍼드는 모바일에서 비쌉니다. 서브패스/타일 메모리에 G-버퍼를 두는 "온칩 디퍼드"나 포워드(+) 렌더링이 모바일에서 자주 선택되는 이유입니다.</li>
<li><b>안티앨리어싱</b>: 데스크톱에서는 비싼 MSAA가 모바일 TBDR에서는 온칩 resolve 덕분에 상대적으로 싸서, 모바일 게임에서 MSAA를 기본 AA로 고르는 경우가 많습니다.</li>
<li><b>후처리 체인</b>: 후처리 단계마다 새 렌더 타깃이면 단계마다 화면 한 장 이상을 읽고 씁니다. 여러 효과를 한 패스(uber post)로 합치는 것이 모바일에서 특히 이득입니다.</li>
</ul>`}],tryIt:["기본값(MSAA 4x, 1920×1080)에서 세 시나리오 뷰어의 HUD를 비교하세요. 좋은 설정은 DRAM 약 16MB/프레임인데 전부 LOAD/STORE는 약 180MB, 중간 전환·리드백은 약 300MB입니다. 타임라인에서 빨강·주황 구간이 16.7ms 선을 밀어내는 것을 보세요.",'MSAA를 끔으로 바꾸세요. 나쁜 설정의 트래픽이 약 41MB로 줄어 16.7ms 안에 들어오지만, 요약 뷰어의 DRAM 전력(mW)은 여전히 좋은 설정의 2.5배쯤입니다. "프레임은 나오는데 폰이 뜨거운" 경우입니다.',"오버드로 (평균 겹침)를 1에서 5로 올리세요. 온칩 숫자와 셰이딩 시간은 늘지만, 렌더 타깃 Load/Store 막대는 그대로입니다. 오버드로의 대역폭은 타일 메모리가 흡수합니다. 요약 뷰어의 IMR 참고 줄만 함께 커집니다.","중간 렌더 타깃 전환 횟수를 0~3으로 바꾸고 CPU 리드백 (glReadPixels)을 껐다 켜 보세요. 전환 한 번마다 노란 막대가 화면 몇 장 분량씩 늘어나고, 리드백은 회색 GPU 유휴 구간을 추가합니다."],pitfalls:['"어차피 화면 전체를 덮어쓰니 glClear를 생략해도 된다" → 드라이버가 이전 내용을 보존해야 한다고 판단해 타일마다 LOAD합니다. 모바일에서는 프레임 시작에 모든 첨부물을 지우는 편이 오히려 빠릅니다.',"깊이 버퍼를 습관적으로 STORE하거나 MSAA 샘플을 그대로 저장한 뒤 따로 resolve → 4x MSAA 1080p에서 프레임마다 수십~백 MB 이상이 추가됩니다. 깊이는 DONT_CARE, MSAA는 타일 안 resolve가 기본입니다.","렌더링 도중 그랩 패스·화면 복사·glReadPixels → 렌더 패스가 끊길 때마다 모든 타일을 내보내고 다시 읽습니다. 데스크톱에서는 티가 안 나던 패턴이 모바일에서 큰 비용이 됩니다."]};export{e as default};
