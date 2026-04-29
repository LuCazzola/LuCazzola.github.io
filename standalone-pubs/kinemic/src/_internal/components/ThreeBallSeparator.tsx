import React from "react";

const ThreeBallSeparator: React.FC = () => (
  <section style={{ margin: "48px 0", display: "flex", justifyContent: "center" }} aria-hidden="true">
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {[12, 16, 12].map((size, i) => (
        <div key={i} style={{ width: size, height: size, borderRadius: "50%", background: "hsl(var(--primary))", boxShadow: "0 14px 30px rgba(2,6,23,0.18)" }} />
      ))}
    </div>
  </section>
);

export default ThreeBallSeparator;
