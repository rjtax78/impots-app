import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Modal from "react-modal";
import { FaRegUser } from "react-icons/fa";
import "swiper/css/autoplay";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { TbMail, TbLock } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, notification, Form, Input } from "antd";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const slidesData = [
    {
      id: 1,
      image: "/card1.jpg",
      title: "Salariés",
      description:
        "Toutes personnes exerçant un métier renumerant et perçevant un salaire, indemnité, avantage en nature",
      link: "Impôts et obligations Autres",
    },
    {
      id: 2,
      image: "/card2.png",
      title: "Associations et ONG",
      description:
        "Tout groupe de personnes ou organisme régi par un statut particulier tels : ONG, ASSOCIATION et qui accomplit une activité à caractère éducatif, culturel, social",
      link: "Impôts",
    },
    {
      id: 3,
      image: "/card3.png",
      title: "Personnes morales ou sociétés",
      description: "Toute forme de société.",
      link: "$199 / Person",
    },
    {
      id: 4,
      image: "/card4.png",
      title: "Salariés",
      description:
        "Toutes personnes exerçant un métier renumerant et perçevant un salaire, indemnité, avantage en nature",
      link: "$199 / Person",
    },
    {
      id: 5,
      image: "/card5.png",
      title: "Salariés",
      description:
        "Toutes personnes exerçant un métier renumerant et perçevant un salaire, indemnité, avantage en nature",
      link: "$199 / Person",
    },
    {
      id: 6,
      image: "/card6.png",
      title: "Salariés",
      description:
        "Toutes personnes exerçant un métier renumerant et perçevant un salaire, indemnité, avantage en nature",
      link: "$199 / Person",
    },
  ];
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const { infoUser } = useSelector((state) => state.auth);

  const { seacrh } = useLocation();
  const sp = new URLSearchParams(seacrh);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (infoUser) {
      navigate(redirect);
    }
  }, [infoUser, redirect, navigate]);
  const submitHandler = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || "Erreur de connexion !");
    }
  };
  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      {/* En-tête */}
      <header className="bg-white">
        <div className="container mx-auto flex justify-between items-center p-4 mt-5">
          <div className=" bg-gray-300 w-[85px] h-[85px] rounded-full flex items-center justify-center text-center">
            <img
              src="/image.png"
              alt="Destination"
              className="rounded-full w-[80px] h-[80px]"
            />
          </div>
          <div className="flex flex-col items-center bg-gray-100 w-[70%] p-2 rounded-[50px]">
            <h2 className="text-3xl font-bold text-[#01A5AF]">
              Direction Générale des Impôts
            </h2>
            <br />
            <p className="">
              Vers une administration fiscale innovante, transparente et pilier
              de l'emergence
            </p>
          </div>
          <div className="space-x-4">
            <button
              className="py-2 px-4  border border-white rounded bg-[#01A5AF] text-white flex items-center"
              onClick={openModal}
            >
              <FaRegUser className="font-bold text-white" />
              &nbsp;
              <span>S'Identifier</span>
            </button>
          </div>
        </div>
      </header>

      {/* Bannière principale */}
      <section className="relative bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center py-12">
          {/* Texte à gauche */}
          <div className="w-[40%] text-center md:text-left">
            <h2 className="text-[1.8rem] font-bold mb-4 text-[#01A5AF]">
              Loi des Finances Rectificatives
            </h2>
            <ul className="flex flex-col list-disc italic text-sm px-5 leading-[25px]">
              <li>
                Interdiction d’exportation en cas de non-paiement de l’IREx dû
                et échu relatif aux exportations antérieures ;
              </li>
              <li>
                Modification du fait générateur de l’IMP lors de l’exécution du
                marché ;
              </li>
              <li>
                Limitation du droit à réduction d’impôt en matière d’IS pour les
                achats de biens et services à ceux ayant fait l’objet de
                déclaration en droit de communication{" "}
              </li>
            </ul>
          </div>
          &nbsp;&nbsp;
          {/* Swiper avec des images en ligne */}
          <div className="w-[65%] h-[40vh] mx-auto">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000, // Change d'image toutes les 3 secondes
                disableOnInteraction: false, // Continue même après interaction
              }}
              loop={true}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  src="/imp1.jpg"
                  alt="Adventure in the forest"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/imp2.jpg"
                  alt="Adventure in the mountains"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/imp3.jpg"
                  alt="Adventure on the beach"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/imp4.png"
                  alt="Adventure in the desert"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* Destinations populaires */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#01A5AF]">
          Qui paie les impôts?
        </h2>
        <div className="container mx-auto py-8 relative px-14">
          {/* Boutons de navigation */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white text-gray-800 shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-200"
            id="prevBtn"
          >
            &#8592;
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white text-gray-800 shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-200"
            id="nextBtn"
          >
            &#8594;
          </button>

          {/* Swiper pour les cartes */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: "#nextBtn",
              prevEl: "#prevBtn",
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination", // Cible l'élément de pagination
            }}
            loop={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mySwiper"
          >
            {slidesData?.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="mx-auto rounded-lg shadow-md overflow-hidden flex flex-col h-[400px]">
                  <div className="w-full h-48">
                    {" "}
                    {/* Taille fixe pour toutes les images */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-1/2 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h1 className="text-lg font-bold text-left">
                      {slide.title}
                    </h1>
                    <p className="text-sm text-gray-600 text-left">
                      {slide.description}
                    </p>
                    <p className="text-left">{slide.link}</p>
                    {/* <div className="flex justify-between items-center mt-4">
                      <span className="text-yellow-500 font-bold">
                        $99 / Person
                      </span>
                      <button className="py-1 px-4 bg-green-800 text-white rounded hover:bg-green-900">
                        Book
                      </button>
                    </div> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Pagination en bas */}
          <div className="custom-pagination mt-6 flex justify-center"></div>
        </div>
      </section>

      {/* Histoires des aventuriers */}
      <section className="bg-gray-800 text-white py-12">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            Our Stories With Adventurers
          </h3>
          <p className="mb-8">
            Direction Générale des Impôts - Immeuble des Finances et du Budget
            Antaninarenina Antananarivo 101 - BP 863. <br /> Tél: 22 335 50 / 22
            287 08 - Email: dgimpots@moov.mg <br /> Copyright © 2008 - 2024 DGI
            https://www.impots.mg . Tous droits resevés{" "}
          </p>
          {/* <div className="flex justify-center space-x-8">
            <div className="text-center">
              <h4 className="text-4xl font-bold">12K+</h4>
              <p>Success Journey</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-bold">16+</h4>
              <p>Awards Winning</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-bold">20+</h4>
              <p>Years Of Experience</p>
            </div>
          </div> */}
        </div>
      </section>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Calendrier"
        style={{
          content: {
            width: "1000px",
            height: "550px",
            margin: "auto",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 1050, // Niveau de pile du contenu
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Ajustement pour plus de visibilité
            zIndex: 1040, // Niveau de pile de l'overlay
          },
        }}
      >
        <div className="flex h-screen">
          <div className="w-1/2 bg-white flex justify-center items-center p-8">
            <div className="w-full max-w-md">
              {/* Titre */}
              <h2 className="text-3xl font-bold mb-4 text-black">
                Welcome back!
              </h2>
              <p className="text-gray-500 mb-8">
                Start managing your finance faster and better
              </p>
              <Spin spinning={isLoading}>
                <Form
                  autoComplete="off"
                  className="py-8 flex flex-col gap-5"
                  onFinish={submitHandler}
                >
                  <label htmlFor="" className="flex items-center">
                    <TbMail style={{ fontSize: "20px" }} />
                    <span className="text-sm">Votre adresse email:</span>
                  </label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez saisir votre adresse email",
                      },
                      {
                        type: "email",
                        message: "Veuillez saisir une adrresse email valide",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      className=" border focus:outline-none px-2 py-1 rounded"
                      // style={{ border: "1px solid #333" }}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@gmail.com"
                    />
                  </Form.Item>
                  <label htmlFor="" className="flex items-center">
                    <TbLock style={{ fontSize: "20px" }} />
                    <span className="text-sm">Votre mot de passe:</span>
                  </label>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez saisir votre mot de passe",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      className=" border focus:outline-none px-2 py-1 rounded"
                      value={password}
                      onChange={(e) => setPasword(e.target.value)}
                      placeholder="Mot de passe utilisateur"
                      visibilityToggle
                    />
                  </Form.Item>
                  <button
                    type="submit"
                    className="w-full bg-cyan-600 p-2 rounded text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "En cours ..." : "Connexion"}
                  </button>
                </Form>
              </Spin>
            </div>
          </div>
          {/* Section Droite */}
          <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center p-8">
            <div className="text-left w-full max-w-sm">
              {/* Logo */}
              <h1 className="text-blue-600 text-2xl font-bold mb-8">FINOTIC</h1>
              {/* Current Balance */}
              <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <p className="text-gray-500 text-sm">CURRENT BALANCE</p>
                <p className="text-blue-600 text-3xl font-bold">$24,359</p>
              </div>
              {/* Circular Graph */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-bold text-black">34%</p>
                    <p className="text-xs text-gray-500">Food</p>
                  </div>
                </div>
                {/* Add Transaction */}
                <div className="p-4 border-2 border-dashed rounded-lg text-center">
                  <div className="text-blue-600 text-2xl">+</div>
                  <p className="text-gray-500 text-sm">New transaction</p>
                  <p className="text-gray-400 text-xs">
                    or upload <span className="text-green-600">.xls</span> file
                  </p>
                </div>
              </div>
              {/* Welcome Back Text */}
              <h2 className="text-2xl font-bold text-black mb-2">
                Welcome back!
              </h2>
              <p className="text-gray-500 text-sm">
                Start managing your finance faster and better
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
