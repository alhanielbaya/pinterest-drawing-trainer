function ImageLoading() {
  return (
    <div className="bg-gray-900 flex flex-col h-screen items-center justify-center">
      <h1 className="text-white mb-4">This may take around 1-3 minutes</h1>
      <div className="flex items-center justify-center space-x-2 animate-pulse">
        <div className="w-4 h-4 m:w-8 m:h-8 bg-zinc-200 rounded-full"></div>
        <div className="w-4 h-4 m:w-8 m:h-8 bg-zinc-200 rounded-full"></div>
        <div className="w-4 h-4 m:w-8 m:h-8 bg-zinc-200 rounded-full"></div>
      </div>
    </div>
  );
}

export default ImageLoading;
