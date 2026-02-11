export interface ResponsiveImage {
  alt: string;
  sources: {
    feed: {
      mobile: string;
      tablet?: string;
      desktop: string;
    };
    detail: {
      mobile: string;
      tablet?: string;
      desktop: string;
    };
  };
}
