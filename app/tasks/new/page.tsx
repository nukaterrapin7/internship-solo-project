import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewTaskPage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder="Title" />
      <TextArea placeholder='Description'/>
      <Button>Submit New Task</Button>
    </div>
  )
}

export default NewTaskPage
