import { useState } from "react";
import ResultCard from "@/components/ResultCard";
import { Shield, Trash2, Search, Loader2 } from "lucide-react";

type Prediction = "phishing" | "safe" | null;

const Index = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [prediction, setPrediction] = useState<Prediction>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExamine = async () => {
    if (!text.trim() && !url.trim()) {
      setError("Please enter message content or URL before examining.");
      return;
    }

    setError(null);
    setPrediction(null);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8080/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: text,
          url: url
        })
      });

      const data = await response.json();

      console.log(data);

      if (data.result === "phishing") {
        setPrediction("phishing");
      } 
      else if (data.result === "safe") {
        setPrediction("safe");
      } 
      else {
        setError("Unknown response from server.");
      }

    } catch (error) {
      console.error(error);
      setError("Unable to connect to detection server.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setUrl("");
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(165 80% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(165 80% 45%) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 py-12">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <Shield className="h-7 w-7 text-primary" />
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            DETECTRA
          </h1>

          <p className="mt-3 text-muted-foreground">
            A Smart Phishing Detection Application
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/20 sm:p-8">
          
          {/* Text Input */}
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Message Content
          </label>

          <textarea
            className="font-mono w-full resize-none rounded-xl border border-border bg-muted/50 p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
            rows={7}
            placeholder="Paste suspicious email, SMS, or message content here..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError(null);
            }}
          />

          {/* URL Input */}
          <label className="mb-2 mt-4 block text-sm font-medium text-muted-foreground">
            Suspicious URL
          </label>

          <input
            type="text"
            className="w-full rounded-xl border border-border bg-muted/50 p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
            placeholder="Paste suspicious URL here..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError(null);
            }}
          />

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleExamine}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Examine
                </>
              )}
            </button>

            <button
              onClick={handleClear}
              className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-5 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-muted"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="animate-fade-in-up mt-4 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              {error}
            </div>
          )}

          {/* Prediction Result */}
          {prediction && <ResultCard prediction={prediction} />}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-muted-foreground/60">
          Powered by Machine Learning · For educational purposes
        </p>
      </div>
    </div>
  );
};

export default Index;