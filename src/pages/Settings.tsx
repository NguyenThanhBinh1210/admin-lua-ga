
const Settings = () => {
  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="col-span-4 tablet:col-span-2 mobile:col-span-4">

        <label htmlFor="tiso">Tỉ sô hối đoái</label>
        <div className="flex items-center gap-x-2 mt-2">
          <input
            id=""
            type="text"
            placeholder="1 điểm"
            disabled
            className="text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          />
          =
          <input
            id="tiso"
            type="text"
            placeholder="Vnđ"
            className="text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          />
        </div>
      </div>
      <div className="col-span-4 tablet:col-span-2 mobile:col-span-4">

        <label htmlFor="time">Thời gian đếm ngược</label>
        <div className="flex items-center gap-x-2 mt-2">
          <input
            id="time"
            type="text"
            placeholder="giây"
            className="text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          />
        </div>
      </div>
      <div className="col-span-4 tablet:col-span-2 mobile:col-span-4">

        <label htmlFor="history">Lịch sử hiển thị tối đa</label>
        <div className="flex items-center gap-x-2 mt-2">
          <input
            id="history"
            type="text"
            placeholder="dòng"
            className="text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          />
        </div>
      </div>
      <div className="col-span-4 tablet:col-span-2 mobile:col-span-4">

        <label htmlFor="radom">Tỉ lệ random</label>
        <div className="flex items-center gap-x-2 mt-2">
          <input
            id="radom"
            type="text"
            placeholder="%"
            className="text-center w-[100px] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          />
        </div>
      </div>
    </div>
  )
}

export default Settings