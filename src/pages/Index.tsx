import { useState } from "react";
import { BookOpen } from "lucide-react";
import UrlInputPanel from "@/components/UrlInputPanel";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [indexId, setIndexId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Research Assistant</h1>
            <p className="text-xs text-muted-foreground">AI-powered article analysis</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        <aside>
          <UrlInputPanel
            onProcessed={(id) => setIndexId(id)}
            isProcessed={!!indexId}
          />
        </aside>
        <section className="min-h-[500px] lg:min-h-0 lg:h-[calc(100vh-120px)]">
          <ChatInterface indexId={indexId} />
        </section>
      </main>
    </div>
  );
};

export default Index;
