import React from "react";
import { Button } from "@/components/ui/button";
import { FiMic, FiUser, FiBookOpen, FiCreditCard, FiMapPin, FiArrowLeft, FiArrowRight  } from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import Image from "next/image";

function Page() {
  return (
    <div className="w-full h-screen overflow-y-scroll md:h-auto ">
      {/* Navbar */}
      <nav className="fixed w-full left-0  top-0 flex justify-between items-center px-6 py-4 bg-white shadow-sm z-20 px-8 lg:px-12">
        <Image src="/logo.png" alt="JobIn logo" width={100} height={100} className="" />
        <div className="flex gap-6 text-gray-600">
          <div className="flex items-center gap-1 cursor-pointer"><MdOutlineWorkOutline /> Pekerjaan</div>
          <div className="flex items-center gap-1 cursor-pointer"><FiCreditCard /> Pembayaran</div>
          <div className="flex items-center gap-1 cursor-pointer"><FiBookOpen /> Kelas</div>
          <div className="flex items-center gap-1 cursor-pointer"><FiUser /> Profil</div>
        </div>
      </nav>

      {/* Hero Image */}
      <section className="relative w-full ">
        <Image
          src="/hero.png"
          alt="JobIn hero"
          width={400}
          height={300}
          className=" w-full object-cover lg:max-h-[60vh]"  
        />
        <div className="absolute top-30 left-8  lg:left-12 z-10 flex w-full gap-20  justify-start items-center">
          <div className="flex flex-col gap-4 justify-start h-full">
            <h2 className=" text-4xl font-bold mt-6 text-white">Semua Bisa Kerja!</h2> {/* Dominan Biru */}
            <p className=" font-semibold  text-gray-600 text-lg md:text-xl mt-2 max-w-lg text-white">
              Cari kerja, apply, dan dapatkan bayaran dengan mudah.
            </p>
          </div>
        </div>
      </section>

      {/* Voice Box */}
      <section className=" flex justify-center px-8 lg:px-12 mt-10">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white w-full max-w-2xl p-10 rounded-2xl text-center shadow-lg">
          <FiMic className="text-7xl mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Cari kerja dengan suara</h3>
          <Button className="bg-white text-blue-500 font-bold px-6 py-4 rounded-xl   hover:text-white hover:bg-yellow-500 transform transition-all duration-300">
            Mulai Bicara
          </Button>
        </div>
      </section>

      {/* Carousel Section - Pekerjaan Terdekat */}
      <section className="py-12 px-8 lg:px-12 h-fit overflow-y-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold ">Pekerjaan Terdekat</h2> {/* Dominan Biru */}
          <div className="flex gap-4 text-gray-600">
            <FiArrowLeft className="cursor-pointer text-2xl" />
            <FiArrowRight className="cursor-pointer text-2xl" />
          </div>
        </div>

        {/* Carousel Cards */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar h-fit overflow-y-hidden">
          <div className="min-w-[280px] bg-white rounded-xl shadow-md p-4   transform transition-all duration-300">
            <Image src="/job1.png" alt="job" width={280} height={160} className="rounded-lg aspect-4/3 object-cover" />
            <h3 className="text-lg font-semibold mt-3 text-gray-800">Tukang Bangunan</h3> {/* Dominan Biru */}
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FiMapPin /> 2 km · Rp100rb/hari
            </p>
            <Button className="w-full mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
              Lihat Detail
            </Button>
          </div>

          <div className="min-w-[280px] bg-white rounded-xl shadow-md p-4   transform transition-all duration-300">
            <Image src="/job2.png" alt="job" width={280} height={160} className="rounded-lg aspect-4/3 object-cover" />
            <h3 className="text-lg font-semibold mt-3 text-gray-800">Bersih Rumah</h3> {/* Dominan Biru */}
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FiMapPin /> 3 km · Rp80rb/hari
            </p>
            <Button className="w-full mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
              Lihat Detail
            </Button>
          </div>
        </div>
      </section>

      {/* Carousel Section - Pekerjaan Terbaru Ditambahkan */}
      <section className="py-12 px-8 lg:px-12 h-fit overflow-y-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold ">Pekerjaan Terbaru Ditambahkan</h2> {/* Dominan Biru */}
        </div>

        {/* Carousel Cards */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar h-fit overflow-y-hidden">
          <div className="min-w-[280px] bg-white rounded-xl shadow-md p-4   transform transition-all duration-300">
            <Image src="/job3.png" alt="job" width={280} height={160} className="rounded-lg aspect-4/3 object-cover"  />
            <h3 className="text-lg font-semibold mt-3 text-gray-800">Kasir Toko</h3> {/* Dominan Biru */}
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FiMapPin /> 1.5 km · Rp90rb/hari
            </p>
            <p className="text-sm text-gray-400 mt-2">Ditambahkan 5 menit yang lalu</p> {/* Keterangan waktu */}
            <Button className="w-full mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
              Lihat Detail
            </Button>
          </div>

          <div className="min-w-[280px] bg-white rounded-xl shadow-md p-4   transform transition-all duration-300">
            <Image src="/job4.png" alt="job" width={280} height={160} className="rounded-lg aspect-4/3 object-cover" />
            <h3 className="text-lg font-semibold mt-3 text-gray-800">Bersih Kantor</h3> {/* Dominan Biru */}
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FiMapPin /> 4 km · Rp85rb/hari
            </p>
            <p className="text-sm text-gray-400 mt-2">Ditambahkan 10 menit yang lalu</p> {/* Keterangan waktu */}
            <Button className="w-full mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
              Lihat Detail
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
