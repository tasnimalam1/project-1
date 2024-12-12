import { Slide } from "react-awesome-reveal";


const Testimonials = () => {
  const reviews = [
    {
      name: "John Doe",
      country: "USA",
      feedback:
        "Visa Navigator made the entire visa process stress-free. The interface was user-friendly, and the team was always helpful!",
      image: "https://i.ibb.co.com/mSYygKL/testi-img1.jpg", // Replace with user's image URL
    },
    {
      name: "Emma Smith",
      country: "UK",
      feedback:
        "Fast and reliable service! I got my tourist visa in just 5 days. Highly recommended.",
      image: "https://i.ibb.co.com/x3tDNzf/testi-img2.jpg",
    },
    {
      name: "Ali Khan",
      country: "UAE",
      feedback:
        "The best platform for visa applications! The support team answered all my questions promptly.",
      image: "https://i.ibb.co.com/6tbdwCH/testi-img3.jpg",
    },
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <Slide triggerOnce direction="right">
        <h2 className="text-3xl font-semibold text-center mb-6">
          What Our Users Say
        </h2>
        </Slide>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="shadow-lg rounded-lg p-6 text-center"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{review.name}</h3>
              <p className="text-sm text-gray-500 mb-4">
                <i>{review.country}</i>
              </p>
              <p className="text-gray-700">{review.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
