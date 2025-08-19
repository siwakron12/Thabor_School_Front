import React, { useEffect, useState } from 'react';
import Asid from './Asid';

export default function AdminConfig() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [dataList, setDataList] = useState([]); // เก็บ array ของข้อมูล
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const response = await fetch(`${apiUrl}phonenumber-config/phonenumber/`);
      if (!response.ok) {
        throw new Error('Failed to fetch phone numbers');
      }
      const data = await response.json();
      setDataList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (index, e) => {
    const updatedList = [...dataList];
    updatedList[index][e.target.name] = e.target.value;
    setDataList(updatedList);
  };

  const handleSubmit = async (id, index) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}phonenumber-config/phonenumber/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
     
        },
        body: JSON.stringify({
          phone_number: dataList[index].phone_number,
          name_owner: dataList[index].name_owner,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update');
      }

      alert('บันทึกสำเร็จ!');
    } catch (error) {
      console.error('Error updating data:', error);
      alert('เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Asid />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">แก้ไขข้อมูลเบอร์โทรศัพท์</h1>
        {dataList.map((item, index) => (
          <form
            key={item.id}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(item.id, index);
            }}
            className="space-y-4 mb-8 border-b pb-4"
          >
            <div>
              <label className="block text-gray-700">เบอร์โทรศัพท์:</label>
              <input
                type="text"
                name="phone_number"
                value={item.phone_number}
                onChange={(e) => handleChange(index, e)}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">ชื่อผู้ดูแล:</label>
              <input
                type="text"
                name="name_owner"
                value={item.name_owner}
                onChange={(e) => handleChange(index, e)}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? 'กำลังบันทึก...' : 'บันทึก'}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
