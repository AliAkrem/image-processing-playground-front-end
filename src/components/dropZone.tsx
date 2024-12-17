import { useRef } from 'react';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import { Button, Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import classes from './DropzoneButton.module.css';


type DropzoneButtonProps = {
    dropZoneProps: DropzoneProps

}



export function DropzoneButton({ dropZoneProps }: DropzoneButtonProps) {
    const theme = useMantineTheme();
    const openRef = useRef<() => void>(null);

    return (
        <div className={classes.wrapper}>
            <Dropzone
                {...dropZoneProps}
                openRef={openRef}
                multiple={false}
                className={classes.dropzone}
                radius="md"
                accept={IMAGE_MIME_TYPE}
            >
                <div style={{ pointerEvents: 'none' }}>
                    <Group justify="center">
                        <Dropzone.Accept>
                            <IconDownload size={50} color={theme.colors.blue[6]} stroke={1.5} />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconCloudUpload size={50} stroke={1.5} />
                        </Dropzone.Idle>
                    </Group>

                    <Text ta="center" fw={700} fz="lg" mt="xl">
                        <Dropzone.Accept>Drop Images here</Dropzone.Accept>
                        <Dropzone.Reject>Images file less than 4mb</Dropzone.Reject>
                        <Dropzone.Idle>Upload Image</Dropzone.Idle>
                    </Text>
                    <Text ta="center" fz="sm" mt="xs" c="dimmed">
                        Drag&apos;n&apos;drop images here to upload. We can accept only <i>.png</i><i>.jpeg</i><i>.tif</i> files that
                        are less than 4mb in size.
                    </Text>
                </div>
            </Dropzone>

            <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
                Select Image
            </Button>
        </div>
    );
}