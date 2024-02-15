"use client"
import Image from "next/image";
import { useState } from "react";
import { GoUpload } from "react-icons/go";
const max = 100;

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [count, setCount] = useState<number>(1);
  const increaseCount = () => {
    if(count === max) return;
    setCount(prev => prev + 1)
  }
  const decreaseCount = () => {
    if(count === 1) return;
    setCount(prev => prev - 1)
  }
  const maxCount = () => {
    setCount(max)
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Use optional chaining for safety

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        setSelectedFile(event.target?.result as string); // Cast to string
      };

      reader.onerror = (error: any) => {
        console.error('Error reading file:', error);
        // Handle the error gracefully, e.g., display an error message to the user
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[url('/bgimage.jpeg')]">
      <div className="flex justify-between w-[900px] p-5">
        <div className="font-bold text-xl"></div>
        <button className="bg-rose-500 px-4 py-2 rounded-lg text-white">Connect wallet</button>
      </div>
      <div className="h-[500px] border rounded-2xl p-10 w-[900px] flex items-center gap-5 bg-white">
          <div className="flex flex-col gap-5 w-1/2">
            <div className="h-80 w-70 ">
              <label htmlFor="picture" className="border border-dashed border-rose-500 rounded-3xl h-full w-full flex flex-col items-center justify-center relative cursor-pointer">
                <input type="file" id="picture" className="invisible" onChange={handleFileChange} />
                    {/* <Image src="/nft.jpeg" fill className="rounded-3xl" alt="nft"/> */}
                    {selectedFile ? (
                      <Image
                        src={selectedFile}
                        alt="Preview"
                        className="max-w-full max-h-full overflow-hidden object-cover rounded-lg"
                        fill
                      />
                    ) : (
                      <>
                        <GoUpload size={32}/>
                        <p>Browse file</p>
                        <p className="text-sm text-muted-foreground">
                          Max size:50MB
                        </p>
                        {/* <p className="text-xs text-muted-foreground">
                          JPG, PNG, GIF, SVG, MP4
                        </p> */}
                      </>
                    )}
                </label>
              </div>
              <div className="flex gap-5 justify-center">
                <button className="px-4 py-2 border-2 border-rose-500 text-2xl rounded-lg" onClick={decreaseCount}>-</button>
                <div className="px-4 py-2 border-2 border-rose-500 text-2xl rounded-lg bg-rose-500 text-white">{count}</div>
                <button className="px-4 py-2 border-2 border-rose-500 text-2xl rounded-lg" onClick={increaseCount}>+</button>
                <button className="px-6 py-2 border-2 border-rose-500 rounded-lg text-xl" onClick={maxCount}>Max</button>
              </div>
              <div className="flex justify-between">
                <div className="font-bold text-sm">Total Minted</div>
                <div className="font-bold text-sm">100% 10000/10000</div>
              </div>
          </div>
          <div className="w-1/2 flex flex-col gap-2 self-start">
            <div className="border-2 border-rose-500 h-20 w-full rounded-xl p-3">
              <div className="font-bold">Presale</div>
              <div className="">1305 Per Wallet</div>
            </div>
            <div className="border-2 border-rose-500 h-20 w-full rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div className="font-bold">OG</div>
                <div>Ended</div>
              </div>
              <div className="">1 Per Wallet . 165 SEI</div>
            </div>
            <div className="border-2 border-rose-500 h-20 w-full rounded-xl p-3">
            <div className="flex items-center justify-between">
                <div className="font-bold">Wishlist</div>
                <div>Ended</div>
              </div>
              <div className="">1 Per Wallet . 165 SEI</div>
            </div>
            <div className=" bg-rose-500 h-20 w-full rounded-xl p-3">
              <div className="font-bold text-white">Public</div>
              <div className="text-white">1 Per Wallet . 165 SEI</div>
            </div>
          </div>
      </div>
    </main>
  );
}
