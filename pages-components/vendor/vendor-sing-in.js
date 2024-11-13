import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Colors from '../../lib/colors';
import useUser from '../../lib/hooks/useUser';
import LoadingSpinner from "../../components/my-spinner/loading-spinner";
import { FaPenFancy } from "react-icons/fa";
import { Input, Textarea, Container, Button, Flex, Heading } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";

const descriptionPlaceholder = 
` דוגמה : המחיר הוא עבור 1 2 3  
 דוגמה: מבצע/ת את כאשר אין אנשים ביית 
  פרטים נוספים ...
  `;

const VendorSingin = ({ setEdit, edit }) => {
  const { data: session, status } = useSession();
  const { user, isLoading, isError, updateUser } = useUser(session?.user?.email);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    description: user?.description || "",
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
    <Flex p={4} boxShadow={  '0 8px 16px rgba(0, 0, 0, 1)'  } background={"gray.200"} direction={"column"} justifyContent={"center"} alignContent={'center'}>
      <form onSubmit={handleSubmit}>
        <Heading fontSize={"3xl"} p={4} color={Colors.c} textAlign={"center"}>
          {`הרשם למערכת `}
        </Heading>

        <Container maxWidth={"700px"}>
          <Field p={1} label="שם" required helperText="תופיע במערכת בשם זה">
            <Input
              variant={"subtle"}
              required
              value={formData.name}
              id="name"
              onChange={handleChange}
            />
          </Field>

          <Field p={1} label="טלפון" required helperText="יוצג ללקוח רק לאחר הסכמה">
            <Input
              variant={"subtle"}
              type="number"
              required
              value={formData.phone}
              id="phone"
              onChange={handleChange}
            />
          </Field>

          <Field p={1} label="תיאור">
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={descriptionPlaceholder}
              resize="none"
              variant={"subtle"}
              rows={3}
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
  );
};

export default VendorSingin;
