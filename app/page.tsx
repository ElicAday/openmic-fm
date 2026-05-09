export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#FF1493",
      color: "#0a0a0a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
      padding: "2rem",
      textAlign: "center",
    }}>
      <h1 style={{
        fontSize: "clamp(48px, 12vw, 140px)",
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: "-0.03em",
        textShadow: "4px 4px 0 #FFE600, 8px 8px 0 #0a0a0a",
        marginBottom: "1rem",
      }}>
        OPENMIC.FM
      </h1>
      <p style={{
        fontSize: "1.25rem",
        fontWeight: 700,
        background: "#FFF8E7",
        padding: "0.75rem 1.5rem",
        border: "3px solid #0a0a0a",
        boxShadow: "5px 5px 0 #0a0a0a",
        transform: "rotate(-2deg)",
      }}>
        coming soon ★ where artists meet voices
      </p>
    </main>
  );
}