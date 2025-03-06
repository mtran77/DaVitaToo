function ChatboxForm({ onNewMessage }) {
  const { handleSubmit, getFieldId } = useForm();
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async () => {
    setLoading(true);
    const aiResponse = await fetchChatResponse(userInput);
    setLoading(false);

    onNewMessage(userInput, aiResponse);
    //clear after
    setUserInput("");
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormSection>
          <Label labelFor={getFieldId("userQuery")}>Ask something:</Label>
          <TextArea
            id={getFieldId("userQuery")}
            placeholder="Start chatting..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </FormSection>
        <FormFooter>
          <Button appearance="primary" type="submit" isDisabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>
        </FormFooter>
      </Form>
    </>
  );
}
