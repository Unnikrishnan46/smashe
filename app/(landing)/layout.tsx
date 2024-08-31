const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto">
      {children}
    </main>
  );
};

export default LandingLayout;
