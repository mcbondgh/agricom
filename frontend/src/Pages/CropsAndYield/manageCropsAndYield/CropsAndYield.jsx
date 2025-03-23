import { ModalComponent } from "../../../components/ui/Modal"
import AddCrop from "./addCrops/AddCrop";
import { FiPlus } from "react-icons/fi";
import { Card } from "flowbite-react";
function CropsAndYield() {
  return (
        <main className="h-[200vh] bg-white rounded-2xl flex flex-col gap-4 shadow-lg p-4">
        {/* Header */}
         <header className="flex items-center justify-between">
         <h1 className="text-2xl font-semibold mb-4">Manage Farmer</h1>
          <ModalComponent btnType={1}  btnIcon={<FiPlus className="mr-2 h-5 w-5"/>} text="Add Crop" header = "Add Crop" >
            <AddCrop/>
          </ModalComponent>
         </header>
    
       {/* Content */}
        <Card>
          Something Here
        </Card>
        </main>
  )
}

export default CropsAndYield