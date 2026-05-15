import { fn } from "@storybook/test";
import Button from "../../components/ui/Button.jsx";

export default {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "ghost", "danger"],
      description: "Варіант оформлення.",
    },
    label: { control: "text", description: "Текст кнопки." },
    disabled: { control: "boolean" },
  },
  args: { onClick: fn() },
};

function Template(args) {
  const { label, ...rest } = args;
  return (
    <Button type="button" {...rest}>
      {label}
    </Button>
  );
}

export const Primary = {
  render: Template,
  args: { variant: "primary", label: "Почати гру", disabled: false },
};

export const Ghost = {
  render: Template,
  args: { variant: "ghost", label: "Скасувати", disabled: false },
};

export const Danger = {
  render: Template,
  args: { variant: "danger", label: "Скинути", disabled: false },
};
