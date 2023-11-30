import { Button, Stack } from '@chakra-ui/react';
import './createNav.css';

interface CreateNewNavProps {
  page: string;
  onButtonClick: () => void;
}

export default function CreateNewNav({ page, onButtonClick}: CreateNewNavProps) {
  const handleSaveClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <>
      <div className="createNewNav flex justify-between">
        <h1 className="text-2xl">Create {page}</h1>

        <Stack spacing={4} direction="row" align="center">
          <Button size="md">
            Cancel
          </Button>
          <Button colorScheme="blue" size="md" onClick={handleSaveClick}>
            Save
          </Button>
        </Stack>
      </div>
    </>
  );
}
