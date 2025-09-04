function sortMessages(messages) {
  messages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date().getTime(a.createdAt)
  );
  return messages;
}

export default sortMessages;
