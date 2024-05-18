import Appbar from "@/components/Appbar";
import UploadImage from "@/components/UploadImage";
import Image from "next/image";

export default function Home() {
  return (
    <main className=""> 
      <Appbar />
      <UploadImage />
    </main>
  );
}
