import React, { useEffect, useState } from "react";
import { Food } from "../../components/Food";

import Header from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import api from "../../services/api";
// import api from "../../services/api";
// import Food from "../../components/Food";
// import ModalAddFood from "../../components/ModalAddFood";
// import ModalEditFood from "../../components/ModalEditFood";

import { FoodsContainer } from "./styles";

interface Food {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  //OPEN MODAL FOOD
  const [modalOpen, setModalOpen] = useState(false);
  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }
  //OPEN MODAL FOOD

  //OPEN MODAL EDIT FOOD
  const [editModalOpen, setEditModalOpen] = useState(false);
  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }
  //OPEN MODAL EDIT FOOD

  //   EDIT FOOD
  const [editingFood, setEditingFood] = useState<Food>({} as Food);
  function handleEditFood(food: Food): void {
    setEditingFood(food);
    setEditModalOpen(true);
  }
  //   EDIT FOOD

  //   ADICIONAR PRATO
  async function handleAddFood(food: Omit<Food, "id" | "available">) {
    try {
      const { name, description, image, price } = food;

      const response = await api.post("foods", {
        name,
        description,
        image,
        price,
        available: true,
      });

      setFoods((state) => [...state, response.data]);
    } catch (err) {
      console.log(err);
    }
  }
  //   ADICIONAR PRATO

  //   ATUALIZAR PRATO
  async function handleUpdateFood(food: Omit<Food, "id" | "available">) {
    const { name, description, price, image } = food;
    const { id } = editingFood;
    const response = await api.put(`foods/${id}`, {
      name,
      description,
      price,
      image,
    });
    setFoods((state) => {
      return state.map((foodState) => {
        if (foodState.id === id) {
          return { ...response.data };
        }
        return foodState;
      });
    });
  }
  //   ATUALIZAR PRATO

//   CARREGAR FOOD
  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get("foods");
      setFoods(response.data);
    }

    loadFoods();
  }, []);
  //   CARREGAR FOOD

  // DELETAR FOOD
  async function handleDeleteFood(id: number) {
      await api.delete(`foods/${id}`);
      const foodsFiltered = foods.filter(food => food.id !== id);
      setFoods(foodsFiltered);
  }
  // DELETAR FOOD

  return (
    <>
      <Header openModal={toggleModal}></Header>

      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;

// class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       foods: [],
//       editingFood: {},
//       modalOpen: false,
//       editModalOpen: false,
//     }
//   }

//   async componentDidMount() {
//     const response = await api.get('/foods');

//     this.setState({ foods: response.data });
//   }

//   handleAddFood = async food => {
//     const { foods } = this.state;

//     try {
//       const response = await api.post('/foods', {
//         ...food,
//         available: true,
//       });

//       this.setState({ foods: [...foods, response.data] });
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   handleUpdateFood = async food => {
//     const { foods, editingFood } = this.state;

//     try {
//       const foodUpdated = await api.put(
//         `/foods/${editingFood.id}`,
//         { ...editingFood, ...food },
//       );

//       const foodsUpdated = foods.map(f =>
//         f.id !== foodUpdated.data.id ? f : foodUpdated.data,
//       );

//       this.setState({ foods: foodsUpdated });
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   handleDeleteFood = async id => {
//     const { foods } = this.state;

//     await api.delete(`/foods/${id}`);

//     const foodsFiltered = foods.filter(food => food.id !== id);

//     this.setState({ foods: foodsFiltered });
//   }

//   toggleModal = () => {
//     const { modalOpen } = this.state;

//     this.setState({ modalOpen: !modalOpen });
//   }

//   toggleEditModal = () => {
//     const { editModalOpen } = this.state;

//     this.setState({ editModalOpen: !editModalOpen });
//   }

//   handleEditFood = food => {
//     this.setState({ editingFood: food, editModalOpen: true });
//   }

//   render() {
//     const { modalOpen, editModalOpen, editingFood, foods } = this.state;

//     return (
//       <>
//         <Header openModal={this.toggleModal} />
//         <ModalAddFood
//           isOpen={modalOpen}
//           setIsOpen={this.toggleModal}
//           handleAddFood={this.handleAddFood}
//         />
//         <ModalEditFood
//           isOpen={editModalOpen}
//           setIsOpen={this.toggleEditModal}
//           editingFood={editingFood}
//           handleUpdateFood={this.handleUpdateFood}
//         />

// <FoodsContainer data-testid="foods-list">
//   {foods &&
//     foods.map(food => (
//       <Food
//         key={food.id}
//         food={food}
//         handleDelete={this.handleDeleteFood}
//         handleEditFood={this.handleEditFood}
//       />
//     ))}
// </FoodsContainer>
//       </>
//     );
//   }
// };

// export default Dashboard;
