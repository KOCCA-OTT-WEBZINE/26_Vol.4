const spotlightItem = {
  0: {
    title: "영상 콘텐츠를 둘러싼 플랫폼 전쟁",
    authors: [
      {
        name: "김정환",
        affiliation: "고려대학교 미디어대학 교수",
      },
    ],
  },
  1: {
    title: "비용효율 콘텐츠 시대: 우리는 지금 K-예능 시대에 산다!",
    authors: [
      {
        name: "지인해",
        affiliation: "신한투자증권 연구위원",
      },
    ],
  },
  2: {
    title: "화면 밖으로 나온 콘텐츠 IP<br>: 참여와 관계에서 찾는 새로운 비즈니스",
    authors: [
      {
        name: "강보라",
        affiliation: "연세대학교 커뮤니케이션연구소 전문연구원",
      },
    ],
  },
};

const trendItem = {
  0: {
    title: "작품 뒤의 작품: OTT의 새로운 상품, 비하인드 다큐멘터리",
    authors: [
      {
        name: "장민지",
        affiliation: "경남대학교 미디어영상학과 부교수",
      },
    ],
  },
  1: {
    title: "서로의 시장에서 하나의 제작 생태계로:<br> 한일 콘텐츠 공동시장화와 방송영상 협력의 새로운 단계",
    authors: [
      {
        name: "이혜은",
        affiliation: "한국콘텐츠진흥원 도쿄비즈니스센터장",
      },
    ],
  },
  2: {
    title: "아시아 드라마의 재편: 콘텐츠 소비 지형 변화가 주는 시사점",
    authors: [
      {
        name: "홍성아",
        affiliation: "말레이시아과학대학교 박사",
      },
    ],
  },
};

const peopleItem = {
  0: {
    title: "‘AI 혁신 선도 프로젝트’의 성과와 과제",
    authors: [
      {
        name: "방준식",
        affiliation: "CJ 4DPLEX 대표",
      },
    ],
  },
};

const globalItem = {
  0: {
    title: "북미",
  },
  1: {
    title: "중남미",
  },
  2: {
    title: "유럽",
  },
  3: {
    title: "아시아",
  },
  4: {
    title: "중동 ∙ 아프리카",
  },
  5: {
    title: "대양주",
  },
};

const dataPointItem = {
  0: {
    title: "[2026년 4분기] 데이터로 읽는 글로벌 OTT 콘텐츠 소비 취향",
  },
  1: {
    title: "글로벌 OTT의 선택이 달라졌다:<br> K-콘텐츠 소비에서 K-컬처 활용으로",
    authors: [
      {
        name: "김미선",
        affiliation: "이화여자대학교 커뮤니케이션미디어연구소 연구원",
      },
    ],
  },
  2: {
    title: "국내 OTT 시장의 디커플링 현상:<br> 이용자 규모보다 ‘시간’을 봐야 하는 이유",
    authors: [
      {
        name: "정애리",
        affiliation: "중앙대학교 첨단영상대학원 겸임교수",
      },
    ],
  },
};

const contentMap = [
  {
    label: "스포트라이트",
    path: "spotlight",
    items: spotlightItem,
  },
  {
    label: "트렌드 하이라이트",
    path: "trend",
    items: trendItem,
  },
  {
    label: "피플 인사이트",
    path: "people",
    items: peopleItem,
  },
  {
    label: "데이터 포인트",
    path: "data",
    items: dataPointItem,
  },
  {
    label: "글로벌 마켓 리포트",
    path: "global",
    items: globalItem,
  },
];

function stripFootnotesAndTags(text) {
  if (!text) return "";

  return String(text)
    .replace(/<br\s*\/?>/gi, "__BR__")
    .replace(/<[^>]*>/g, "")
    .replace(/__BR__/g, "<br>")
    .replace(/\[\d+\]/g, "")
    .replace(/\(\d+\)/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function highlightQuotes(text) {
  const QUOTE_REGEX = /["'「」『』\u2018\u2019\u201C\u201D]/g;

  return String(text).replace(
    QUOTE_REGEX,
    (quote) => `<span class="bodyQuotes">${quote}</span>`
  );
}

function renderAuthors(authors) {
  if (!Array.isArray(authors) || authors.length === 0) return "";

  return authors
    .map(({ name, affiliation }) => {
      const safeName = name || "";
      const safeAffiliation = affiliation || "";

      return `
        <p class="author">
          ${safeName}${safeAffiliation ? ` | ${safeAffiliation}` : ""}
        </p>
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("menu-close");
  const menu = document.getElementById("mobile-menu");
  const content = document.getElementById("menu-content");

  if (!toggle || !closeBtn || !menu || !content) return;

  toggle.addEventListener("click", () => {
    renderMenu();
    menu.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", () => {
    closeMenu();
  });

  content.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link) return;

    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("active")) {
      closeMenu();
    }
  });

  function closeMenu() {
    menu.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function renderMenu() {
    content.innerHTML = "";

    contentMap.forEach(({ label, path, items }) => {
      const section = document.createElement("div");
      section.className = "menu-section";

      const sectionDescription =
        path === "spotlight"
          ? `<p id="menu-spotlight-subject">수용자와 플랫폼</p>`
          : "";

      section.innerHTML = `
        <div class="section-title">
          <h2>${label}</h2>
          ${sectionDescription}
        </div>

        <ul class="section-list">
          ${Object.entries(items)
            .map(([key, item]) => {
              const authors = renderAuthors(item.authors);

              return `
                <li class="section-item">
                  <a href="./${path}_${Number(key) + 1}.html" class="menu-link">
                    <p>${highlightQuotes(
                      stripFootnotesAndTags(item.title)
                    )}</p>
                    ${authors}
                  </a>
                </li>
              `;
            })
            .join("")}
        </ul>
      `;

      content.appendChild(section);
    });
  }
});