import { useForm } from "react-hook-form";

import TextField from "../../../shared/components/TextField/TextField";
import Button from "../../../shared/components/Button/Button";

const LoginForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = values => {
    console.log(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField 
          register={register} 
          rules={{ required: "Email or username is required" }} 
          name="identifier" 
          placeholder="Email or Username"
          error={errors.name}
        />
         <TextField 
          register={register} 
          rules={{ required: "Password is required" }} 
          name="password" 
          placeholder="password" 
          error={errors.password}
        />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;

