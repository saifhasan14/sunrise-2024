import React, { useState } from "react";
import { Modal } from "antd";
import CreateForm from "./CreateForm";
import { PlusOutlined } from "@ant-design/icons";

const CreateModal: React.FC<{ refreshData: () => void }> = ({ refreshData }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        className="fixed bottom-5 right-5 bg-blue-400 hover:bg-blue-600 font-bold p-4 rounded-full"
        onClick={showModal}
      >
        <PlusOutlined style={{ color: "white" }} />
      </button>
      <Modal title="Create Task" open={open} footer={null} onCancel={handleCancel}>
        <CreateForm refreshData={refreshData} />
      </Modal>
    </>
  );
};

export default CreateModal;
