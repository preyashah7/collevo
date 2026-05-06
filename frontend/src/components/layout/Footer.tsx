export default function Footer(): JSX.Element {
  return (
    <footer className="mt-16 bg-[#1F2937] text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-200">About Collevo</h3>
          <p className="mt-3 text-sm text-gray-300">Decision-focused college discovery for students who want clarity, not clutter.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-200">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li><a href="/colleges" className="hover:text-white">All Colleges</a></li>
            <li><a href="/compare" className="hover:text-white">Compare</a></li>
            <li><a href="/saved" className="hover:text-white">Saved</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-200">Popular Streams</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li>Engineering</li>
            <li>Management</li>
            <li>Medical</li>
            <li>Law</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-200">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li>support@collevo.app</li>
            <li>India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 px-4 py-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Collevo. All rights reserved.</div>
    </footer>
  )
}
