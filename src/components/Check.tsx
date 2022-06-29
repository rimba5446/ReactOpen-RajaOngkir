import { API } from "../api/api";
import { useState, useEffect, FC, SyntheticEvent } from "react";
import ProvinceData from "../types/prov";
import CityData from "../types/city";
import { convertToRupiah } from "../utils/rupiah";

type CostData = {
  service: string;
  cost: any[];
};

const Check: FC = () => {
  const [provinces, setProvinces] = useState<ProvinceData[]>([]);
  const [cities1, setCities1] = useState<CityData[]>([]);
  const [cities2, setCities2] = useState<CityData[]>([]);
  const [costList, setCostList] = useState<CostData[]>([]);
  const [asal, setAsal] = useState<string>("");
  const [tujuan, setTujuan] = useState<string>("");
  const [berat, setBerat] = useState<string>("");
  const [kurir, setKurir] = useState<string>("");

  useEffect(() => {
    getProvinces();
  }, [provinces]);

  const valAsal = (val: string): void => {
    setAsal(val);
  };
  const valTujuan = (val: string): void => {
    setTujuan(val);
  };
  const valBerat = (val: string): void => {
    setBerat(val);
  };
  const valKurir = (val: string): void => {
    setKurir(val);
  };

  const getProvinces = async () => {
    try {
      const resp = await API.get(`/provinsi`);
      setProvinces(resp.data.rajaongkir.results);
    } catch (err) {
      console.log(err);
    }
  };

  const getCity1 = async (idProv1: string) => {
    try {
      const resp = await API.get(`/kota/${idProv1}`);
      setCities1(resp.data.rajaongkir.results);
    } catch (err) {
      console.log(err);
    }
  };

  const getCity2 = async (idProv2: string) => {
    try {
      const resp = await API.get(`/kota/${idProv2}`);
      setCities2(resp.data.rajaongkir.results);
    } catch (err) {
      console.log(err);
    }
  };

  const getCost = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const resp = await API.get(`ongkos/${asal}/${tujuan}/${berat}/${kurir}`);
      setCostList(resp.data.rajaongkir.results[0].costs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-lg border shadow-lg bg-slate-50 mx-auto my-7 p-5 rounded-lg">
      <form className="mt-5">
        <hr className="border border-black" />
        <div className="w-full bg-slate-200 p-2">
          <p className="text-2xl text-red-900 font-semibold mt-1 mb-1">
            Kota Pengirim
          </p>
        </div>
        <hr className="border border-black mb-3" />
        <label htmlFor="prov1" className="text-m text-red-900 mt-5 mb-1">
          Pilih Provinsi
        </label>
        <select
          name="prov1"
          id="prov1"
          onChange={(e) => getCity1(e.target.value)}
          className="dropdown-toggle
          px-6
          py-2.5
          bg-green-500
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-green-600 hover:shadow-lg
          focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-green-700 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap"
        >
          <option value="">-- Pilih Provinsi --</option>
          {provinces.map((item) => (
            <option value={item.province_id} key={item.province_id}>
              {item.province}
            </option>
          ))}
        </select>
        <label htmlFor="kot1" className="label-section">
          Pilih Kota
        </label>
        <select
          name="kot1"
          id="kot1"
          onChange={(e) => valAsal(e.target.value)}
          className="dropdown-toggle
          px-6
          py-2.5
          bg-green-500
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-green-600 hover:shadow-lg
          focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-green-700 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap"
        >
          <option value="">-- Pilih kota --</option>
          {cities1.map((item) => (
            <option value={item.city_id} key={item.city_id}>
              {item.type} {item.city_name}
            </option>
          ))}
        </select>
        <hr className="border border-black mt-5" />
        <div className="w-full bg-slate-200 p-2">
          <p className="text-2xl text-red-900 font-semibold mt-1 mb-1">
            Kota Penerima
          </p>
        </div>
        <hr className="border border-black mb-3" />
        <label htmlFor="prov2" className="text-m text-red-900 mt-5 mb-1">
          Pilih Provinsi
        </label>
        <select
          name="prov2"
          id="prov2"
          onChange={(e) => getCity2(e.target.value)}
          className="dropdown-toggle
          px-6
          py-2.5
          bg-green-500
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-green-600 hover:shadow-lg
          focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-green-700 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap"
        >
          <option value="">-- Pilih provinsi --</option>
          {provinces.map((item) => (
            <option value={item.province_id} key={item.province_id}>
              {item.province}
            </option>
          ))}
        </select>
        <label htmlFor="kot2" className="label-section">
          Pilih Kota
        </label>
        <select
          name="kot2"
          id="kot2"
          onChange={(e) => valTujuan(e.target.value)}
          className="dropdown-toggle
          px-6
          py-2.5
          bg-green-500
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-green-600 hover:shadow-lg
          focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-green-700 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap"
        >
          <option value="">-- Pilih Kota --</option>
          {cities2.map((item) => (
            <option value={item.city_id} key={item.city_id}>
              {item.type} {item.city_name}
            </option>
          ))}
        </select>
        <label className="label-section" htmlFor="berat">
          Berat (gram)
        </label>
        <input
          type="number"
          name="berat"
          id="berat"
          onChange={(e) => valBerat(e.target.value)}
          placeholder="Berat kiriman"
          className="w-full h-9 border border-slate-500 rounded-lg mb-1 pl-2"
        />
        <label className="label-section" htmlFor="kurir">
          Kurir
        </label>
        <select
          id="kurir"
          name="kurir"
          onChange={(e) => valKurir(e.target.value)}
          className="dropdown-toggle
          px-6
          py-2.5
          bg-green-500
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-green-600 hover:shadow-lg
          focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-green-700 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap"
        >
          <option value="">-- Pilih Kurir --</option>
          <option value="jne">JNE</option>
          <option value="pos">POS Indonesia</option>
          <option value="tiki">TIKI</option>
        </select>
        <h1><br /></h1>
        <button
          onClick={getCost}
          className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          Cek Ongkir
        </button>
      </form>

      <div className="mt-3">
        <div>
          {costList.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-blue-200 text-black m-1 rounded-lg"
            >
              <div>
                <div className="flex flex-column justify-between">
                  <b className="text-red-900">{item.service}</b>
                  <i>{convertToRupiah(item.cost[0].value)}</i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};
export default Check;
