// reportWebVitals.js
// ------------------------------------------------------------
// This module is used to measure and report performance metrics
// for a React application using the 'web-vitals' library.
// These metrics help evaluate the user experience and loading
// behaviour of the application.
// ------------------------------------------------------------

const reportWebVitals = (onPerfEntry) => {
  // Check if a valid callback function is provided
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' library
    // This ensures performance metrics are loaded only when needed
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // CLS: Cumulative Layout Shift - visual stability
      getCLS(onPerfEntry);

      // FID: First Input Delay - responsiveness
      getFID(onPerfEntry);

      // FCP: First Contentful Paint - initial content rendering time
      getFCP(onPerfEntry);

      // LCP: Largest Contentful Paint - main content visibility time
      getLCP(onPerfEntry);

      // TTFB: Time To First Byte - server response time
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;