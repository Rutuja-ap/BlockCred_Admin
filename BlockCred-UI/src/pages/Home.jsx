
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="flex min-h-[calc(100vh-64px)] items-center px-6 py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
              Blockchain-Based Academic Credentials
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Secure Academic
              <span className="block text-indigo-400">
                Credentials.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              BlockCred helps administrators manage student records and
              academic certificates with blockchain-backed integrity.
            </p>

            <Link
              to="/admin/login"
              className="mt-8 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500"
            >
              Admin Login →
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-xl font-semibold">
              Admin Portal
            </h2>

            <p className="mt-3 leading-7 text-slate-400">
              Authorized administrators can manage student information,
              upload academic certificates, and register certificate
              records on the blockchain.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="font-medium">Student Management</p>
                <p className="mt-1 text-sm text-slate-500">
                  Add and manage student records.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="font-medium">Certificate Management</p>
                <p className="mt-1 text-sm text-slate-500">
                  Upload and access academic certificates.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="font-medium">Blockchain Integrity</p>
                <p className="mt-1 text-sm text-slate-500">
                  Maintain tamper-resistant certificate records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
