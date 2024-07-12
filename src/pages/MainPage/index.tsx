import { addDoc, collection, getDocs } from "firebase/firestore";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import ListAccountant from "../../components/Dropdown/ListAccountant";

interface Accountant {
  id: string;
  name: string;
}

interface ListAccountantProps {
  label: string;
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

const MainPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [accountant, setAccountant] = useState("");
  const [message, setMessage] = useState("");
  const [accountants, setAccountants] = useState<Accountant[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  useEffect(() => {
    const fetchAccountants = async () => {
      const querySnapshot = await getDocs(collection(db, "accountants"));
      const accountantsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Accountant[];
      setAccountants(accountantsData);
    };

    fetchAccountants();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file && accountant) {
      try {
        const docRef = await addDoc(collection(db, "orders"), {
          status: "pending",
          accountant,
          timestamp: new Date(),
        });
        setMessage("Order added successfully");
      } catch (e) {
        setMessage("Error adding order: " + e);
      }
    }
  };

  return (
    <main>
      <Header />
      <div className="background-main-page p-4">
        abc
        {/* <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Accountant</label>
              <ListAccountant
                label="ListAccountant"
                options={accountants}
                selectedOptions={product.categories.map(
                  (category) => category.id
                )}
                onChange={handleCategoriesChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Upload PDF</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#319795] h-[46px] rounded-3xl w-40 font-semibold text-[16px] text-white"
            >
              Add Order
            </button>
          </form>
          {message && <p className="mt-4">{message}</p>}
        </div> */}
      </div>
    </main>
  );
};

export default MainPage;
