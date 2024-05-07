import Header from "./components/Header";
import Card from "./components/Card";
import Footer from "./components/Footer";
import { getUserByEmail,createUser,getProducts } from "../sanity/sanity-utils";
import { currentUser } from "@clerk/nextjs/server"

export default async function page() {
  const user = await currentUser();
 
  if (!user) return <div>You are not logged in</div>;

  // Check if the user with the current email already exists in Sanity
  const existingUser = await getUserByEmail(user?.emailAddresses[0]?.emailAddress);

  // If the user with the email doesn't exist, create the user in Sanity
  if (existingUser.length === 0) {
    const newUserResult = await createUser({
      name: user?.firstName,
      email: user?.emailAddresses[0]?.emailAddress,
      user:existingUser
    });
  }


  const products = await getProducts();


  return (
    <div>
      <Header />

      <div className="flex flex-col items-center justify-center mt-10 space-y-4">
        <h1 className="text-4xl font-bold text-[#990033] text-center ">
          Get Something
        </h1>
        <p className="text-center text-xl text-gray-500">
          Have fun buying unique products. Ready to create good memories for
          you.
        </p>
      </div>
      <div className="flex p-10">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {
          products.map((product)=>(
            <Card key={product._id} product={product}/>
          ))
        }
         
          
        </div>
      </div>

      <Footer />
    </div>
  );
}


