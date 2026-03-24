import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Link2, Plus, Trash2, CheckCircle2 } from "lucide-react";

interface UrlInputPanelProps {
  onProcessed: (indexId: string) => void;
  isProcessed: boolean;
}

const UrlInputPanel = ({ onProcessed, isProcessed }: UrlInputPanelProps) => {
  const [urls, setUrls] = useState<string[]>(["", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const addUrl = () => setUrls([...urls, ""]);

  const removeUrl = (index: number) => {
    if (urls.length <= 1) return;
    setUrls(urls.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    const validUrls = urls.filter((u) => u.trim());
    if (validUrls.length === 0) {
      setError("Please enter at least one URL.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("https://research-ai-backend-gdqm.onrender.com/api/process-urls/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: validUrls }),
      });
      if (!res.ok) throw new Error("Failed to process URLs");
      const data = await res.json();
      onProcessed(data.index_id);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Link2 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-card-foreground">Article URLs</h2>
      </div>

      {isProcessed ? (
        <div className="flex items-center gap-2 text-accent p-4 rounded-lg bg-accent/10">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">Articles processed — ready to ask questions!</span>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {urls.map((url, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  placeholder={`https://example.com/article-${i + 1}`}
                  value={url}
                  onChange={(e) => updateUrl(i, e.target.value)}
                  disabled={loading}
                  className="flex-1"
                />
                {urls.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeUrl(i)}
                    disabled={loading}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={addUrl} disabled={loading}>
              <Plus className="h-4 w-4 mr-1" /> Add URL
            </Button>
            <Button onClick={handleProcess} disabled={loading} className="ml-auto">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing…
                </>
              ) : (
                "Process URLs"
              )}
            </Button>
          </div>

          {error && <p className="text-destructive text-sm mt-3">{error}</p>}
        </>
      )}
    </div>
  );
};

export default UrlInputPanel;
