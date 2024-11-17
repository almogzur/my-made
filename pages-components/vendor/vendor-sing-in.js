import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Colors from '../../lib/colors';
import useUser from '../../lib/hooks/useUser';
import LoadingSpinner from "../../components/my-spinner/loading-spinner";
import { FaPenFancy } from "react-icons/fa";
import { Input, Textarea, Container, Button, Flex, Heading } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { WindowWidthContext } from "../../context";
import { useRouter } from "next/router";
const descriptionPlaceholder = 
` דוגמה : המחיר הוא עבור 1 2 3  
 דוגמה: מבצע/ת את כאשר אין אנשים ביית 
  פרטים נוספים ...
  `;

const VendorSingin = ({ setEdit, edit }) => {
  const { data: session, status } = useSession();
  const { user, isLoading, isError, updateUser } = useUser(session?.user?.email);
  const { xxl,xl,lg,md,sm,xs,xxs} = useContext(WindowWidthContext);
  const router = useRouter()



  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });



  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsFetching(true);
      const response = await fetch('/api/vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        updateUser();
        setTimeout(() => setIsFetching(false), 3000);
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setEdit(false);
    }
  };

  if (status === "loading" || isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  return (  
    <Flex justifyContent={"center"}>
    <Container fontWeight={"bold"} p={0}  m={0} >
    <Flex p={4}  direction={"column"} justifyContent={"center"} alignContent={'center'}>
      <form onSubmit={handleSubmit}>

        <Container maxWidth={"700px"} boxShadow={  '0 8px 16px rgba(0, 0, 0, 1)'   } p={3} >
        <Heading fontSize={!xs?"xl":"3xl"} p={4} color={Colors.c} textAlign={"center"}>הרשם למערכת ההזמנות כנותן שירות </Heading>

          <Field p={1} label="שם"  required helperText="תופיע במערכת בשם זה">
            <Input
              variant={"subtle"}
              required
              value={formData.name}
              id="name"
              onChange={handleChange}
            />
          </Field>

          <Field p={1} label="טלפון" required helperText="יוצג ללקוח רק לאחר  ">
            <Input
              variant={"subtle"}
              type="tel"
              required
              value={formData.phone}
              id="phone"
              onChange={handleChange}
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"

            />
          </Field>


          <Flex justifyContent={"center"}>
            <Button bg={Colors.d} m={4} type="submit">
              <FaPenFancy size={"1.5em"} color={Colors.c} />{"הרשמה"}
            </Button>
          </Flex>
        </Container>
      </form>
    </Flex>
    </Container>
    </Flex>
  );
};

export default VendorSingin;
