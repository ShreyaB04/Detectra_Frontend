interface ResultCardProps {
  prediction: "phishing" | "safe";
}

const ResultCard = ({ prediction }: ResultCardProps) => {
  const isPhishing = prediction === "phishing";

  return (
    <div
      className={`animate-fade-in-up mt-6 rounded-xl border p-6 text-center ${
        isPhishing
          ? "border-danger/30 bg-danger/10 shadow-[var(--glow-danger)]"
          : "border-safe/30 bg-safe/10 shadow-[var(--glow-safe)]"
      }`}
    >
      <span className="text-4xl">{isPhishing ? "🚨" : "✅"}</span>
      <h3
        className={`mt-3 text-xl font-bold ${
          isPhishing ? "text-danger" : "text-safe"
        }`}
      >
        {isPhishing ? "Phishing Detected" : "Safe Message"}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {isPhishing
          ? "This message appears to be fraudulent. Do not click any links or share personal information."
          : "This message appears to be legitimate. No phishing indicators found."}
      </p>
    </div>
  );
};

export default ResultCard;
