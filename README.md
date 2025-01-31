# Gravidot

[![display mode](https://github.com/user-attachments/assets/da9f10b1-0f8a-41f2-91de-dbf5eace8394)](https://www.gravidot.com/)

<div align="center">

### Play and share your ideas with multiple gestures!

#### 멀티터치로 아이디어를 연결하고 실시간 협업이 가능한 브레인스토밍 서비스

<br>

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fgravidot%2Fgravidot&count_bg=%2338A1FF&title_bg=%23141414&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://github.com/gravidot/gravidot)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fwww.gravidot.com&count_bg=%23FF641E&title_bg=%23000000&icon=livejournal.svg&icon_color=%23FFFFFF&title=www.gravidot.com&edge_flat=false)](https://www.gravidot.com)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fmedium.com%2F%40howyoujini%2Fgravidot-0-1-0-%25EB%258B%25A4%25EA%25B0%2599%25EC%259D%25B4-%25EC%2595%2584%25EC%259D%25B4%25EB%2594%2594%25EC%2596%25B4%25EB%25A5%25BC-%25ED%2584%25B0%25EC%25B9%2598%25ED%2595%25B4%25EB%25B3%25BC%25EA%25B9%258C%25EC%259A%2594-%25EF%25B8%258F-f814499cd39c&count_bg=%2382F132&title_bg=%23000000&icon=medium.svg&icon_color=%23FFFFFF&title=Medium&edge_flat=false)](https://medium.com/@howyoujini/gravidot-0-1-0-%EB%8B%A4%EA%B0%99%EC%9D%B4-%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4%EB%A5%BC-%ED%84%B0%EC%B9%98%ED%95%B4%EB%B3%BC%EA%B9%8C%EC%9A%94-%EF%B8%8F-f814499cd39c)

</div>

<br>

## 목차

<!-- toc -->

- [아이디어 등장 배경](#%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4-%EB%93%B1%EC%9E%A5-%EB%B0%B0%EA%B2%BD)
  - [멀티 터치를 활용해 아이디어 스케치를 직관적이고 즐겁게 만들자!](#%EB%A9%80%ED%8B%B0-%ED%84%B0%EC%B9%98%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%B4-%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4-%EC%8A%A4%EC%BC%80%EC%B9%98%EB%A5%BC-%EC%A7%81%EA%B4%80%EC%A0%81%EC%9D%B4%EA%B3%A0-%EC%A6%90%EA%B2%81%EA%B2%8C-%EB%A7%8C%EB%93%A4%EC%9E%90)
  - [새로운 창의적 경험을 디자인하다](#%EC%83%88%EB%A1%9C%EC%9A%B4-%EC%B0%BD%EC%9D%98%EC%A0%81-%EA%B2%BD%ED%97%98%EC%9D%84-%EB%94%94%EC%9E%90%EC%9D%B8%ED%95%98%EB%8B%A4)
- [기능 소개](#%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C)
  - [1. 노드 생성 및 편집](#1-%EB%85%B8%EB%93%9C-%EC%83%9D%EC%84%B1-%EB%B0%8F-%ED%8E%B8%EC%A7%91)
  - [2. 보드 편집모드](#2-%EB%B3%B4%EB%93%9C-%ED%8E%B8%EC%A7%91%EB%AA%A8%EB%93%9C)
  - [3. 툴바](#3-%ED%88%B4%EB%B0%94)
- [기술 스택](#%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
- [개발 과정에서 고민했던 부분](#%EA%B0%9C%EB%B0%9C-%EA%B3%BC%EC%A0%95%EC%97%90%EC%84%9C-%EA%B3%A0%EB%AF%BC%ED%96%88%EB%8D%98-%EB%B6%80%EB%B6%84)
  - [1. 아이패드 웹 디버깅 어떻게 하나요?](#1-%EC%95%84%EC%9D%B4%ED%8C%A8%EB%93%9C-%EC%9B%B9-%EB%94%94%EB%B2%84%EA%B9%85-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%95%98%EB%82%98%EC%9A%94)
  - [2. 무한 캔버스의 백그라운드 그리드 구현: svg 채택](#2-%EB%AC%B4%ED%95%9C-%EC%BA%94%EB%B2%84%EC%8A%A4%EC%9D%98-%EB%B0%B1%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EA%B7%B8%EB%A6%AC%EB%93%9C-%EA%B5%AC%ED%98%84-svg-%EC%B1%84%ED%83%9D)
    - [방법 1️⃣. SVG의 pattern을 사용하는 방법](#%EB%B0%A9%EB%B2%95-1%EF%B8%8F%E2%83%A3-svg%EC%9D%98-pattern%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
    - [방법 2️⃣. Canvas 태그 내에서 동적으로 생성하는 방법](#%EB%B0%A9%EB%B2%95-2%EF%B8%8F%E2%83%A3-canvas-%ED%83%9C%EA%B7%B8-%EB%82%B4%EC%97%90%EC%84%9C-%EB%8F%99%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%83%9D%EC%84%B1%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
  - [3. 낮은 해상도에 DPR 적용하기](#3-%EB%82%AE%EC%9D%80-%ED%95%B4%EC%83%81%EB%8F%84%EC%97%90-dpr-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
    - [1. DPR(Device Pixel Ratio) 적용](#1-dprdevice-pixel-ratio-%EC%A0%81%EC%9A%A9)
    - [2. Canvas 크기 조정](#2-canvas-%ED%81%AC%EA%B8%B0-%EC%A1%B0%EC%A0%95)
  - [4. 멀티터치 hook 구현](#4-%EB%A9%80%ED%8B%B0%ED%84%B0%EC%B9%98-hook-%EA%B5%AC%ED%98%84)
    - [1. ✌️ 두 손가락(2-finger touch)](#1-%E2%9C%8C%EF%B8%8F-%EB%91%90-%EC%86%90%EA%B0%80%EB%9D%BD2-finger-touch)
    - [2. 세 손가락(3-finger touch)](#2-%EC%84%B8-%EC%86%90%EA%B0%80%EB%9D%BD3-finger-touch)
    - [3. 네 손가락(4-finger touch) - 도형 크기 조정](#3-%EB%84%A4-%EC%86%90%EA%B0%80%EB%9D%BD4-finger-touch---%EB%8F%84%ED%98%95-%ED%81%AC%EA%B8%B0-%EC%A1%B0%EC%A0%95)
    - [4. 🤚 다섯 손가락(5-finger touch)](#4-%F0%9F%A4%9A-%EB%8B%A4%EC%84%AF-%EC%86%90%EA%B0%80%EB%9D%BD5-finger-touch)
  - [5. ResizeObserver 경고: 비동기적으로 처리하여 해결](#5-resizeobserver-%EA%B2%BD%EA%B3%A0-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%B2%98%EB%A6%AC%ED%95%98%EC%97%AC-%ED%95%B4%EA%B2%B0)
- [회고](#%ED%9A%8C%EA%B3%A0)

<!-- tocstop -->

<br>

## [아이디어 등장 배경](#목차)

### 멀티 터치를 활용해 아이디어 스케치를 직관적이고 즐겁게 만들자!

기존의 데스크탑 기반 생산성 도구는 주로 키보드와 마우스를 중심으로 한 정형화된 입력 방식을 제공합니다. 클릭, 더블클릭, 드래그와 같은 동작은 익숙하지만, 창의적이고 감각적인 작업에서는 때때로 정적이라고 느껴집니다. 특히 복잡한 아이디어를 빠르게 정리하거나 시각적으로 구조화할 때, 이러한 도구들이 제공하는 인터페이스는 직관성과 유연성 면에서 부족함이 있습니다. 하지만 터치 디바이스에서 멀티 터치를 활용하면 손가락의 자연스러운 움직임을 바탕으로 다양한 입력 방식을 지원해, 정형화된 생산성 도구가 제공할 수 없는 새롭고 창의적인 가능성을 제공합니다.

<br>

### 새로운 창의적 경험을 디자인하다

멀티 터치 기반 인터페이스는 단순히 생산성을 높이는 데 그치지 않고, 창의적이고 실험적인 브레인스토밍 환경을 제공합니다. 아이디어를 구조화하거나 노드를 편집할 때, 기존의 도구처럼 복잡한 메뉴와 단축키에 의존하는 대신, 손가락 제스처 하나로 간단하게 작업을 수행할 수 있습니다. 예를 들어, 두 손가락으로 노드의 크기와 각도를 수정하고 세 손가락으로 노드의 형태를 변경하고, 네 손가락의 드래그 동작으로는 노드의 너비와 높이를 변경하는 등, 물리적인 제스처를 통한 상호작용은 단순한 클릭보다 더 직관적이고 자연스럽게 느껴집니다. 또, 두 손가락을 벌려 아이디어의 연결선을 확대하고, 세 손가락을 사용해 노드 간의 관계를 시각적으로 재정의하는 과정은 마치 종이 위에 직접 그리는 것과 같은 몰입감을 줍니다.

<br>

## [기능 소개](#목차)

지금은 **아이패드** 혹은 **스마트폰**에서 시연 가능합니다.

<br>

### [1. 노드 생성 및 편집](#목차)

(터치된 순서를 기준으로 손가락 번호가 부여됩니다.)

- **더블 클릭**: 도형 노드를 **생성**할 수 있습니다.
- **한 손가락 드래그**: 도형 노드의 위치를 변경할 수 있습니다.
- **두 손가락 핀치**: 두 손가락의 거리와 각도를 통해 도형 노드의 **크기와 각도**를 편집할 수 있습니다.
- **세 손가락**: 세 손가락 중, 1번째와 3번째의 각도를 통해 도형 노드의 **종류**를 변경할 수 있습니다.
- **네 손가락**: 네 손가락 중, 1번째와 4번째의 거리를 통해 도형 노드의 **높이와 너비**를 각각 조절할 수 있습니다.
- **다섯 손가락**: 다섯 손가락의 거리에 따라 도형 노드의 **색**을 변경할 수 있습니다.
- **도형 다시 더블 클릭**: 도형 노드를 **삭제**할 수 있습니다.

<br>

![gravidot](https://github.com/user-attachments/assets/029d1eb4-dca5-4ac3-9cd2-79865b8bdb70)

### [2. 보드 편집모드](#목차)

- 익명 로그인을 제공하고 사용자는 랜덤의 이름으로 보드를 이용할 수 있습니다.
- 보드의 제목을 편집할 수 있고, 새로운 보드를 생성할 수 있습니다.

![IMG_1258](https://github.com/user-attachments/assets/f0857451-a494-499d-91cf-884aced70373)

### [3. 툴바](#목차)

- 보드의 **배경 패턴을 변경**할 수 있습니다. (Dot / Line)
- **보드 편집 모드**와 **노드 편집 모드**로 토글링할 수 있습니다.
- 휴지통 버튼으로 보드를 삭제할 수 있습니다.

<br>

## [기술 스택](#목차)

![next.js](https://img.shields.io/badge/next-141414?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![zustand](https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white)
![tailwindcss](https://img.shields.io/badge/tailwindcss-61DAFB?style=for-the-badge&logo=tailwindcss&logoColor=white)

![supabase](https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-FFD93E?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-pink?style=for-the-badge&logo=prettier&logoColor=white)
![npm](https://img.shields.io/badge/npm-red?style=for-the-badge&logo=npm&logoColor=white)
![vercel](https://img.shields.io/badge/vercel-f0f0f0?style=for-the-badge&logo=vercel&logoColor=black)

<br>
<br>

## [개발 과정에서 고민했던 부분](#목차)

### [1. 아이패드 웹 디버깅 어떻게 하나요?](#목차)

저는 Brave 브라우저를 사용하고 있습니다. 하지만 터치 디바이스인 아이패드에서는 어떻게 디버깅을 할지 고민이 되었습니다. (아직까지 Brave 에서 아이패드 연결하여 디버깅할 수 있는 방법을 못찾았습니다🥲) 아이패드는 Apple 의 강력한 통치(?) 아래에 있기 때문에 Safari 를 통해 디버깅할 수 있는 방법을 찾았습니다.

아이패드를 C 타입의 케이블로 연결하고 Safari 상단의 Develop 을 클릭하고 아래와 같이 iPadOS 를 확인하여 콘솔창을 열어볼 수 있습니다.

아직 localhost 로 개발중인 환경이라면, 터미널을 열고 ifconfig en0를 입력하여 네트워크 인터페이스의 설정 정보 중 첫 번째 이더넷 어댑터를 조회할 수 있습니다. 아래 이미지에서 inet 뒤에있는 “IP 주소” + “:포트번호” 를 아이패드 Safari 에 입력하면 잘 렌더링됩니다!

<br>

### [2. 무한 캔버스의 백그라운드 그리드 구현: svg 채택](#목차)

무한 캔버스의 백그라운드 그리드를 구현하는 방법은 두 가지가 있었습니다.

SVG(Scalable Vector Graphics)는 벡터 그래픽 기반의 웹 기술로, 크기 조정과 품질 유지에 강점을 가지며, 다양한 그래픽과 시각적 요소를 구현하는 데 사용됩니다. **확대/축소 시 품질 유지, 구현의 간결성, CSS와의 연동, GPU 가속 지원, 그리고 DOM 조작의 유연성이 중요하다고 판단하여 SVG의 pattern을 채택**하게 되었습니다.

<br>

#### 방법 1️⃣. SVG의 pattern을 사용하는 방법

장점

- SVG는 벡터 기반으로, 크기를 늘리거나 줄여도 품질 저하 없이 렌더링되므로 확대/축소(Zoom)에도 선명한 출력을 제공합니다.
- pattern 태그를 사용하면 그리드 패턴을 보다 손쉽게 생성할 수 있습니다.
- DOM에 추가된 SVG 요소를 직접 조작하거나 스타일을 변경하기도 용이합니다. SVG는 자체적으로 내부 DOM을 생성하기 때문입니다.
- CSS와의 연동이 가능하여, fill 속성을 활용해 패턴 스타일링을 간편하게 할 수 있습니다.
- SVG는 브라우저의 GPU 가속을 활용하므로, 확대/축소 시 비교적 부드럽게 동작합니다.

단점

- DOM 요소가 많아질수록 성능 저하가 발생할 수 있습니다. 특히 복잡한 애니메이션이나 빠른 동작 처리 시 성능이 떨어질 가능성이 있습니다.
- 정교한 그리드 패턴 제어가 어렵습니다.
- Canvas처럼 픽셀 단위로 세밀하게 점의 크기, 간격 등을 동적으로 변경하기에는 제약이 따릅니다.

<br>

#### 방법 2️⃣. Canvas 태그 내에서 동적으로 생성하는 방법

장점

- Canvas는 벡터가 아닌 픽셀 단위로 렌더링되므로, 대규모 그래픽 처리에 적합하며 고성능을 발휘합니다.
- DOM 요소를 추가하지 않으므로, 대량의 점이나 복잡한 그래픽을 렌더링할 때 DOM 복잡도가 줄어들어 효율적입니다.
- 동적 렌더링에 강점이 있습니다.
- JavaScript를 사용해 점의 크기, 간격, 위치 등을 실시간으로 제어할 수 있습니다.
- 줌이나 팬과 같은 동작도 유연하게 처리할 수 있습니다.
- 애니메이션 구현에 유리합니다.
- Canvas는 프레임 단위로 재렌더링을 처리하므로 자연스러운 애니메이션을 지원합니다.

단점

- 화질 저하 가능성이 있습니다.
- 확대/축소 시 저해상도 느낌이 들 수 있습니다. 이 문제는 고해상도 Canvas 설정으로 어느 정도 완화할 수 있습니다.
- 브라우저 크기가 변경되면 Canvas 크기를 다시 설정해야 하는 번거로움이 있습니다.
- 모든 요소가 독립적인 DOM 요소가 아니라 하나의 단일 픽셀 맵으로 존재하기 때문에, 이벤트 처리의 어려움이 있습니다.
- Canvas는 픽셀 기반이기 때문에 DOM 이벤트와 직접적으로 연동하기 어렵습니다.
- 특정 점이나 영역의 클릭 이벤트를 처리하려면 별도의 로직을 구현해야 합니다.

<br>

### [3. 낮은 해상도에 DPR 적용하기](#목차)

#### 1. DPR(Device Pixel Ratio) 적용

현대 디스플레이는 고해상도를 지원하는 경우가 많아, Device Pixel Ratio(DPR)에 따라 화면에 표시되는 그래픽의 선명도가 달라질 수 있습니다. 이를 고려하지 않고 **기본 해상도로만 Canvas를 설정하면**, 특히 고해상도 디스플레이에서 그래픽이 **흐릿하거나 픽셀이 도드라져 보일 수** 있습니다.

이를 해결하기 위해 **window.devicePixelRatio를** 활용해 현재 디바이스의 DPR 값을 가져옵니다. 일반적으로 이 값은 디바이스의 물리적 픽셀과 CSS 픽셀 간의 비율을 나타내며, 고해상도 디스플레이일수록 1보다 큰 값(예: 2, 3 등)이 됩니다.

이 값을 도형의 위치(x, y), 크기(width, height), 선 두께(lineWidth) 등의 **모든 렌더링 속성에 곱해줌**으로써 디바이스 해상도에 맞춘 선명한 그래픽을 생성할 수 있습니다. 예를 들어, DPR이 2인 경우, 도형의 모든 속성을 2배로 확대해 계산하고 Canvas가 이를 렌더링하도록 설정합니다.

<br>

#### 2. Canvas 크기 조정

Canvas 태그는 **기본적으로 CSS로 설정된 크기와 실제 렌더링에 사용되는 내부 해상도(픽셀 크기)가 분리되어** 있습니다. 즉, Canvas의 CSS 크기와 실제 픽셀 해상도가 다를 경우, 그래픽이 흐릿하게 보이는 현상이 발생합니다.

이를 해결하려면, **Canvas의 내부 해상도도 DPR에 맞춰 조정**해야 합니다. 예를 들어, CSS로 지정된 Canvas의 크기가 400x300이고 DPR이 2라면, 내부 해상도를 800x600으로 설정해야 합니다.

1. `canvas.width`와 `canvas.height` 값을 **DPR에 따라 증가시켜** 고해상도를 지원.
2. Canvas의 스타일 크기(`style.width`, `style.height`)를 **기존 CSS 크기와 동일하게 유지**하여, 시각적으로는 동일한 크기로 보이도록 설정.
3. 조정된 해상도에 맞게 모든 그래픽 요소의 위치와 크기를 DPR로 계산하여 렌더링.

이처럼 Canvas 자체의 크기를 조정하면, 확대/축소를 하거나 디바이스 환경이 변하더라도 그래픽이 선명하게 유지됩니다. 특히 고해상도 디스플레이 환경에서 이러한 설정은 더욱 중요한데, 이는 브라우저가 Canvas를 자동으로 스케일링할 경우 발생하는 화질 저하를 방지할 수 있기 때문입니다.

<br>

**[DPR 적용 전]**

<img width="1912" alt="before_dpr" src="https://github.com/user-attachments/assets/a43b3e91-c8cb-4d41-ac16-d5b29563054f" />

**[DPR 적용 후]**

<img width="1912" alt="after_dpr" src="https://github.com/user-attachments/assets/698bd848-daf1-4c6c-abf5-3053295d067e" />

<br>

### [4. 멀티터치 hook 구현](#목차)

멀티터치 인터페이스는 터치 기반 디바이스에서 여러 손가락을 동시에 사용하여 다양한 작업을 직관적으로 수행할 수 있도록 지원합니다. 이를 React 환경에서 활용하기 위해 `useMultiTouch`라는 커스텀 Hook을 설계했으며, 이 Hook은 여러 손가락 터치를 인식하고 이를 기반으로 도형 노드를 편집하거나 조작할 수 있는 기능을 제공합니다.

<br>

**1. 기본 동작 원리**

멀티터치 인터페이스는 `TouchEvent`를 통해 디바이스 화면에 가해지는 **여러 손가락의 위치, 움직임, 거리, 각도 등을 감지**합니다. 이 데이터를 바탕으로 사용자가 수행하려는 작업을 추론하고, 이에 따라 도형의 속성(크기, 회전, 색상 등)을 변경하거나 새로운 형태로 변환하는 작업을 진행합니다.

실제로 이벤트를 콘솔에 찍고 아이패드에서 터치를 해보면, 아래와 같이 Touch Event 를 확인할 수 있습니다. 좀 더 자세히 들여다 보면 제가 드래그 해둔 Touch 라는 인터페이스를 확인할 수 있습니다. 현재 손가락 3개로 터치를 했기 때문에, 3개의 TouchList (유사배열객체) 가 있고, 그 List 안에는 Touch 라는 인터페이스로 존재하고 있습니다.

<br>

**2. 멀티터치의 활성화와 초기화**

- 터치 이벤트 추적

  사용자가 화면에 손가락을 대는 순간부터 `TouchEvent`를 통해 터치 좌표를 감지합니다. 이를 기반으로 터치 포인트(손가락의 위치 좌표)를 추적합니다.

- 멀티터치 상태 관리

  **두 손가락 이상이 동시에 화면을 터치하**면 멀티터치 모드가 활성화됩니다. 이 상태는 `useRef`를 활용해 지속적으로 추적되며, 손가락이 화면에서 떼어지면 초기화됩니다.

- 초기 데이터 설정

  멀티터치가 활성화되었을 때 초기 거리와 각도를 계산하고 저장합니다. 이는 이어지는 작업에서 비교 기준으로 사용됩니다.

<br>

**3. 주요 기능과 처리 방식**

#### 1. ✌️ 두 손가락(2-finger touch)

- 도형의 크기와 회전 조작

  두 손가락으로 터치하면 손가락 간의 거리와 각도를 계산합니다.

- 거리 변화

  손가락 간의 거리가 초기 거리보다 증가하면 도형이 확대되고, 감소하면 축소됩니다. 이를 통해 도형의 스케일을 조정합니다. 크기는 최소 0.5배에서 최대 3배까지 제한하여 불필요한 왜곡을 방지합니다.

- 각도 변화

  손가락 간의 각도 차이를 계산하여 도형을 회전시킵니다. 각도는 초기값을 기준으로 계산하며, 회전 값은 라디안 단위를 도(degree)로 변환해 적용됩니다.

<br>

#### 2. 세 손가락(3-finger touch)

- 도형의 형태 변경

  세 손가락을 사용하면 두 손가락 간의 각도를 기준으로 특정 도형을 선택하여 현재 노드의 형태를 변경합니다.

- 각도 기반 도형 선택

  손가락 간 각도가 작을수록 간단한 도형(예: 원형, 직사각형)을 선택하고, 각도가 커질수록 복잡한 도형(예: 별 모양, 다각형)을 선택합니다.

- 제한 범위 설정

  각도를 단계적으로 구분하여 도형의 형태를 예측 가능한 범위 내에서만 변경합니다. 이는 의도치 않은 과도한 변경을 방지하기 위한 조치입니다.

<br>

#### 3. 네 손가락(4-finger touch) - 도형 크기 조정

네 손가락을 사용하면 터치된 영역의 최소, 최대 좌표를 계산하여 도형의 가로 세로 크기를 재설정합니다.

- 크기 제한

  도형의 최소 크기를 100px로 설정하여 너무 작은 크기로 인해 도형이 보이지 않거나 조작이 어려워지는 상황을 방지합니다.

- 동적 크기 변경

  네 손가락 간의 거리 변화를 기준으로 도형의 폭과 높이를 계산해 실시간으로 적용합니다.

<br>

#### 4. 🤚 다섯 손가락(5-finger touch)

- 도형의 색상 변경

다섯 손가락을 사용할 경우, 첫 번째 손가락과 다섯 번째 손가락 간의 거리를 기준으로 도형의 색상을 변경합니다.

- 거리와 색상 매핑

  거리가 특정 임계값을 넘으면 해당 범위에 해당하는 색상이 선택됩니다. 예를 들어, 짧은 거리는 빨간색, 중간 거리는 파란색, 더 긴 거리는 투명색으로 설정됩니다.

- 유연한 색상 전환

  각 거리를 임계값(threshold)으로 나누어 사용자 입력에 따라 다양한 색상을 제공하며, 사용자는 색상을 직관적으로 변경할 수 있습니다.

<br>

### [5. ResizeObserver 경고: 비동기적으로 처리하여 해결](#목차)

```shell
ResizeObserver loop completed with undelivered notifications
```

이 경고는 브라우저 콘솔에서 자주 나타나는 메시지로, ResizeObserver가 레이아웃 변화를 감지하는 과정에서 일부 알림을 제대로 처리하지 못했음을 나타냅니다.

일반적으로 치명적인 오류는 아니지만, 레이아웃 변경과 관련된 작업의 순서 또는 이벤트 루프 처리 방식에서 발생합니다. 이 경고는 특정한 상태 변경, DOM 수정, 또는 리렌더링 작업이 ResizeObserver의 감지 동작과 겹치면서 발생하는 경우가 많습니다. 네손가락으로 Shape 의 너비와 높이를 수정함에 있어서 이 경고가 떴습니다.

ResizeObserver를 비동기적으로 처리하여 해결했습니다.

```js
const resizeObserver = new ResizeObserver(() => {
  setTimeout(() => {
    // 상태 업데이트 또는 DOM 작업
  }, 0);
});
```

<br>

## 회고

개인 프로젝트의 특징을 뽑자면 혼자라서 모든 것이 즐거웠고 모든 것이 외로웠습니다.혼자라서 결정이 빨랐지만 함께 고민해줄 사람이 없다는 것이 한 생각에 갇히게 했던 것 같습니다. 구현방식을 나름 결정하여 구현을 하다보면 예상치 못한 부분에서 예상치 못한 문제를 만나곤 했습니다. 이를 테면 무한캔버스라던가, supabase 의 DB 설계 등에서 이런 경우가 많았는데, reset 하고 다시 생각해보면 생각보다 단순한 방향에서 해결되는 경우가 많았습니다. 또, 작업하면서 svg 나 canvas, 그리고 react 의 상태흐름 단방향 구조에 대해 다시 한번 깨닫고 익힐 수 있는 시간이었습니다. 앞으로도 꾸준히 업데이트 해보려고 합니다.
