import React, {   useState } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil';
import {apiData} from './state'

const App = () => {

  const [file,setFile]=useState();
  const [apiDataa,setApiData]=useRecoilState(apiData);

  const onFileChange=(e)=>{
    e.preventDefault();
    setFile(e.target.files[0]);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('file',file);
    // console.log('Himanshu',file);
    formData.append('fileName',file.name);
    fetchData(formData);
     
  }
  const fetchData = async (formData) => {
    try {
      const {data} = await axios.post(`http://localhost:5000/file-upload`,formData,{
        headers:{
          'content-type': 'multipart/form-data',
        },
      });
      const {result} =data;
      setApiData([...apiDataa,result]);
      // console.log(apiDataa.EDUCATION);
    } catch (err) {
      console.log(err.message);
    }
  };


   
  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="flex justify-center mt-8">
    <div className="rounded-lg shadow-xl bg-gray-50 lg:w-1/2">
        <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">Upload
                File(PDF)</label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-7">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd" />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Select a File</p>
                    </div>
                    <input type="file" className="opacity-0" onChange={onFileChange} />
                </label>
            </div>
        </div>
        <div className="flex p-2 space-x-4">
            <button className="px-4 py-2 text-white bg-red-500 rounded shadow-xl">Cannel</button>
            <button type='submit' className="px-4 py-2 text-white bg-green-500 rounded shadow-xl" >Upload</button>
        </div>
    </div>
</div>
</form>



<div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-white border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                S.NO.
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Email
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Skills
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Education
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Experience
              </th>
            </tr>
          </thead>
          <tbody>
            {apiDataa.map((item,index)=>(
               <tr key={index} className="bg-gray-100 border-b">
               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
               <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                 {item.NAME}
               </td>
               <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                 {item.EMAIL}
               </td>
               <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                 {item.SKILLS.map((value,key)=>(
                  <div key={key}>{value}</div>
                 ))}
               </td>
               <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {item.EDUCATION}
                 
               </td>
               <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {item.EXPERIENCE}
                 
               </td>
             </tr>
            ))}
            {/* <tr class="bg-gray-100 border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Otto
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
            </tr> */}
            {/* <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Jacob
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Thornton
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @fat
              </td>
            </tr> */}
            {/* <tr class="bg-gray-100 border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
              <td colspan="2" class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                Larry the Bird
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @twitter
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default App