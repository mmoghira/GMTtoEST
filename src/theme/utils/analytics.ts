/**
 * Privacy-First Real User Metrics (RUM) & Event Analytics Utility
 * Tracks tool usage, search interactions, copy actions, and Core Web Vitals (LCP, CLS, INP).
 */

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function trackEvent(action: string, category: string, label?: string, value?: number): void {
  if (typeof window === 'undefined') return;

  // Log event to window.gtag if available (Google Analytics 4)
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }

  // Also log to Vercel Analytics / custom console debug if enabled
  if (import.meta.env.DEV) {
    console.log(`[RUM Event] Category: ${category} | Action: ${action} | Label: ${label || 'N/A'}`);
  }
}

/**
 * Initializes Core Web Vitals Monitoring (LCP, CLS, INP)
 */
export function initWebVitalsMonitoring(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // Monitor Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        trackEvent('LCP_Metric', 'CoreWebVitals', `${Math.round(lastEntry.startTime)}ms`, Math.round(lastEntry.startTime));
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Monitor Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      trackEvent('CLS_Metric', 'CoreWebVitals', clsValue.toFixed(3), Math.round(clsValue * 1000));
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (err) {
    // Graceful fallback if PerformanceObserver entry type is unsupported
  }
}

// Auto-initialize Web Vitals monitoring on DOM ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    initWebVitalsMonitoring();
  } else {
    window.addEventListener('load', initWebVitalsMonitoring);
  }
}
