import { RepositoryGrid } from "./repository-grid";

export function RepositoryLayout() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Repository</h1>
        <p className="text-gray-500 text-sm mt-1">
          Analisis produktivitas dan health score repository GitHub kamu
        </p>
      </div>

      <RepositoryGrid />
    </div>
  );
}