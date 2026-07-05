// 상품 이미지는 실제 사진으로 교체하기 전까지 사용할 플레이스홀더(SVG)입니다.
function placeholderImage(label, bg, fg = "#ffffff") {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="750">
      <rect width="600" height="750" fill="${bg}"/>
      <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="32"
            fill="${fg}" text-anchor="middle" dominant-baseline="middle">${label}</text>
    </svg>`.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const products = [
  {
    id: "p1",
    name: "오버사이즈 코튼 티셔츠",
    price: 32000,
    sizes: ["S", "M", "L", "XL"],
    image: placeholderImage("Oversized Tee", "#2b2b2b"),
    description:
      "두꺼운 코튼 원단으로 제작한 오버사이즈 핏 티셔츠입니다. 여유로운 실루엣과 편안한 착용감으로 데일리로 활용하기 좋습니다.",
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
