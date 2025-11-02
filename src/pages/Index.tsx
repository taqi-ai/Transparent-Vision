import { useState, useEffect } from "react";
import { Moon, Sun, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [servingRange, setServingRange] = useState("42-45");
  const [waitTime, setWaitTime] = useState("15 min");
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [progress, setProgress] = useState(65);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
  const statusRef = ref(db, "status/");
  onValue(statusRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // ✅ Update UI with live Firebase values
      setServingRange(data.serving || "--");
      setWaitTime(data.wait_time || "--");
      setProgress(data.progress || 0);
      setLastUpdated(data.updated || "--");
    }
  });
}, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Generate bokeh circles
  const bokehCircles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 200 + 100,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  return (
    <div className="relative min-h-screen overflow-hidden gradient-background">
      {/* Bokeh Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bokehCircles.map((circle) => (
          <div
            key={circle.id}
            className="absolute rounded-full opacity-20 blur-3xl"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left: `${circle.left}%`,
              top: `${circle.top}%`,
              background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
              animation: `float ${6 + circle.delay}s ease-in-out infinite`,
              animationDelay: `${circle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Ripple Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full border-2 border-white/10"
          style={{ animation: "ripple 3s ease-out infinite" }}
        />
        <div
          className="absolute w-96 h-96 rounded-full border-2 border-white/10"
          style={{ animation: "ripple 3s ease-out infinite", animationDelay: "1s" }}
        />
        <div
          className="absolute w-96 h-96 rounded-full border-2 border-white/10"
          style={{ animation: "ripple 3s ease-out infinite", animationDelay: "2s" }}
        />
      </div>

      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          onClick={toggleTheme}
          variant="ghost"
          size="icon"
          className="glass-card hover:bg-white/30 transition-all duration-300"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-6 pb-4">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-3xl py-5 px-8 inline-block mx-auto max-w-3xl w-full">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Hospital Logo */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 md:w-7 md:h-7 text-white fill-white animate-pulse-glow" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl blur-lg -z-10" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                      Welcome to
                    </span>
                  </h1>
                  <p className="text-base md:text-lg font-semibold text-foreground/90">
                    Transparent Waiting Room
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-14rem)] px-4">
        <div
          className="glass-card rounded-[2rem] p-8 md:p-12 max-w-3xl w-full transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
          style={{
            transform: "perspective(1000px)",
          }}
        >
          <div className="space-y-8">
            {/* Status Tag with Icon */}
            <div className="flex items-center justify-center">
              <div className="glass-card rounded-full py-4 px-8 border-2 border-primary/30 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="text-2xl animate-pulse-glow">🩺</span>
                    <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md -z-10" />
                  </div>
                  <p className="text-lg md:text-xl font-bold">
                    Now Serving Patients{" "}
                    <span
                      id="serving-range"
                      className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-flip font-mono"
                      style={{
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {servingRange}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                <span>Queue Progress</span>
                <span>{progress}%</span>
              </div>
              <div
                id="progress-bar"
                className="relative w-full h-4 bg-white/20 rounded-full overflow-hidden shadow-inner"
              >
                <div
                  className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite]"
                    style={{
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s ease-in-out infinite",
                    }}
                  />
                </div>
                {/* Pulse glow */}
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full blur-xl animate-pulse transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Average Wait Time with Clock Icon */}
            <div className="flex items-center justify-center gap-3 py-6">
              <div className="relative">
                <Clock className="w-6 h-6 md:w-7 md:h-7 text-primary animate-pulse-glow" />
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg -z-10" />
              </div>
              <p className="text-lg md:text-xl font-medium text-foreground/90">
                Average Wait:{" "}
                <span
                  id="wait-time"
                  className="font-bold text-primary text-2xl md:text-3xl"
                >
                  {waitTime}
                </span>
              </p>
            </div>

            {/* Footer Text */}
            <div className="pt-6 border-t border-white/20 text-center space-y-2">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Updated{" "}
                <span
                  id="updated"
                  className="font-mono font-semibold text-foreground animate-pulse-glow"
                >
                  {lastUpdated}
                </span>
                {" · "}
                <span className="text-primary font-medium">Stay calm</span>
                {" · "}
                <span className="text-accent font-medium">
                  We'll be with you soon
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 pb-8">
        <div className="container mx-auto px-4 text-center">
          <div className="glass-card rounded-2xl py-3 px-6 inline-block">
            <p className="text-sm text-muted-foreground">
              Real-time queue information • Auto-refreshes every 8 seconds
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
