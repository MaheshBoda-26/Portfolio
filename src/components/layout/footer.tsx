export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Built and designed by Mahesh Boda.
          </p>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            All rights reserved. &copy; {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}