import React, { Component, createRef, useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import { FormHandles } from "@unform/core";

interface Food {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

type CreateFood = Omit<Food, "id" | "available">;

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: CreateFood) => void;
}



const ModalAddFood: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddFood,
}) => {
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit (food: CreateFood) {
    const { name, image, price, description } = food;
  
    await handleAddFood({ name, image, price, description });
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

// class ModalAddFood extends Component {
//   constructor(props) {
//     super(props);

//     this.formRef = createRef();
//   }

  // handleSubmit = async data => {
  //   const { setIsOpen, handleAddFood } = this.props;

  //   handleAddFood(data);
  //   setIsOpen();
  // };

//   render() {
//     const { isOpen, setIsOpen } = this.props;

//     return (
//       <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
// <Form ref={this.formRef} onSubmit={this.handleSubmit}>
//   <h1>Novo Prato</h1>
//   <Input name="image" placeholder="Cole o link aqui" />

//   <Input name="name" placeholder="Ex: Moda Italiana" />
//   <Input name="price" placeholder="Ex: 19.90" />

//   <Input name="description" placeholder="Descrição" />
//   <button type="submit" data-testid="add-food-button">
//     <p className="text">Adicionar Prato</p>
//     <div className="icon">
//       <FiCheckSquare size={24} />
//     </div>
//   </button>
// </Form>
//       </Modal>
//     );
//   }
// };

export default ModalAddFood;
