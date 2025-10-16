import { useEffect, useState } from 'react';

import type { StampStatus } from '../../../../types/stamp';
import Button from '../_components/Button';
import ProgressBar from '../_components/ProgressBar';

import EditIcon from '@assets/icons/edit.svg?react';
import CheckIcon from '@assets/icons/check.svg?react';
import DeleteIcon from '@assets/icons/x.svg?react';

import usePatchStamp from '@hooks/stamp/usePatchStamp';

interface StampCardProps {
    tripId: number;
    stamp: StampStatus;
    isCurrentInProgress?: boolean;
}

const StampCard = ({
    stamp,
    tripId,
    isCurrentInProgress = false,
}: StampCardProps) => {
    const { stampId, stampName, completed, totalMissions, completedMissions } =
        stamp;

    const [editedName, setEditedName] = useState(stampName);
    const [isEditingMode, setIsEditingMode] = useState(false);

    useEffect(() => {
        setEditedName(stampName);
    }, [isEditingMode, stampName]);

    useEffect(() => {}, [totalMissions, completedMissions]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    };

    const { mutatePatchStamp } = usePatchStamp();

    const handleEditModeToggle = () => {
        if (isEditingMode) {
            mutatePatchStamp(
                { tripId, stampId, name: editedName },
                {
                    onSuccess: () => {
                        setIsEditingMode(false);
                    },
                }
            );
        } else setIsEditingMode(true);
    };

    let buttonToRender = null;

    if (!isEditingMode) {
        if (completed) {
            buttonToRender = <Button isCompleted={completed} />;
        } else {
            if (isCurrentInProgress) {
                buttonToRender = (
                    <Button
                        isCompleted={completed}
                        onClick={() => console.log('임시')}
                    />
                );
            }
        }
    } else {
        if (completed) buttonToRender = null;
        else {
            if (isCurrentInProgress) {
                buttonToRender = (
                    <Button
                        isCompleted={completed}
                        onClick={() => console.log('임시')}
                    />
                );
            } else buttonToRender = <DeleteIcon className="h-6 w-6" />;
        }
    }

    return (
        <article className="flex flex-col gap-1 rounded-xl bg-white px-5 py-[0.6875rem] shadow-[0_6px_18px_0_rgba(0,0,0,0.08)]">
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex max-w-2/3 gap-2">
                        {isEditingMode ? (
                            <input
                                autoFocus
                                className="text-text-sub text-body font-medium focus:outline-0"
                                value={editedName}
                                placeholder={stampName}
                                onChange={handleNameChange}
                            />
                        ) : (
                            <h5 className="text-text-sub text-body truncate font-medium">
                                {stampName}
                            </h5>
                        )}
                        {completed || !isCurrentInProgress ? null : (
                            <div className="flex w-12 items-center justify-center rounded-b-md bg-[#F8F7F5] py-[0.0625rem]">
                                <p className="text-text-sub text-caption">
                                    진행 중
                                </p>
                            </div>
                        )}
                    </div>
                    <button
                        className="cursor-pointer"
                        onClick={handleEditModeToggle}
                    >
                        {!completed ? (
                            isEditingMode ? (
                                <CheckIcon className="h-[1.125rem] w-[1.5rem]" />
                            ) : (
                                <EditIcon className="fill-[#EEE7D8]" />
                            )
                        ) : null}
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <ProgressBar
                    completedLength={completedMissions}
                    progressLength={totalMissions}
                />
                {buttonToRender}
            </div>
        </article>
    );
};

export default StampCard;
