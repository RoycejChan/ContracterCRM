import { Button, Stack } from '@chakra-ui/react';
import './createNav.css';

interface CreateNewNavProps {
  page: string;
  onButtonClick: () => void;
  onCancel: () => void;

}

export default function CreateNewNav({ page, onButtonClick, onCancel}: CreateNewNavProps) {
  const handleSaveClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  const handleCancelClick = () => {
    if (onCancel) {
       onCancel();
    }
  }

  return (
    <>
      <div className="createNewNav flex justify-between">
        <h1 className="text-2xl">Create {page}</h1>

        <Stack spacing={4} direction="row" align="center">
          <Button size="md" onClick={handleCancelClick}>
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
