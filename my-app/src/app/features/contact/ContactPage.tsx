import { useAppSelector, useAppDispatch } from "../../store/store";
import { decrement, increment } from "./counterReducer";
import { Typography, Button, ButtonGroup } from "@mui/material";

export default function ContactPage() {
  const {data} = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

    return (
      <>
        <Typography variant="h2">
          Contact Page
        </Typography>
        <Typography variant="body1">
          The data is: {data}
        </Typography>
        <ButtonGroup>
          <Button onClick={() => dispatch(decrement(1))} color="error">Decrement</Button>
          <Button onClick={() => dispatch(increment(1))} color="secondary">Increment</Button>
          <Button onClick={() => dispatch(increment(5))} color="primary">Increment by 5</Button>
        </ButtonGroup>
      </>
    )
  }