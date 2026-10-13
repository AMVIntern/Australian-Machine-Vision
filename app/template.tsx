export default function Template({ children }: { children: React.ReactNode }) {
  // opacity-only entrance: transforms or filters here would re-parent
  // position:fixed descendants and break ScrollTrigger pinning
  return <div className="page-enter">{children}</div>;
}
