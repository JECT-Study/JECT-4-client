import { useEffect, useState } from 'react';

import Button from './Button';
import type { TripDetail } from '../../../../types/trip/trip';

import EditIcon from '@assets/icons/edit.svg?react';
import CalendarIcon from '@assets/icons/calendar.svg?react';
import CalendarModal from './CalendarModal';

interface TripCardProps {
    trip: TripDetail;
    isEditing: boolean;
    onSave: (newName: string, newEndDate: string) => void;
    onEditModeToggle: () => void;
}

const TripCard = ({
    trip,
    isEditing,
    onSave,
    onEditModeToggle,
}: TripCardProps) => {
    const { name, startDate, endDate } = trip;

    const [editedName, setEditedName] = useState(name);
    const [editedEndDate, setEditedEndDate] = useState(endDate);
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        setEditedName(name);
        setEditedEndDate(endDate);
    }, [name, endDate, isEditing]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    };

    const handleEditButtonClick = () => {
        onEditModeToggle();
    };

    const handleSaveButtonClick = () => {
        onSave(editedName, editedEndDate);
    };

    const handleEditEndDate = () => {
        if (isEditing) {
            setShowCalendar(true);
        }
    };

    const handleCalendarDateSelect = (selectedCalendarDate: Date) => {
        const newEndDateString = selectedCalendarDate
            .toISOString()
            .split('T')[0];

        setEditedEndDate(newEndDateString);
        setShowCalendar(false);
    };

    return (
        <article className="bg-text-sub flex h-[4.875rem] w-full items-center justify-between rounded-xl p-5">
            <div className="flex w-full items-center justify-end gap-2">
                <div className="flex w-1/2 flex-col">
                    {isEditing ? (
                        <input
                            autoFocus
                            className="text-subtitle text-background font-semibold focus:outline-0"
                            placeholder={name}
                            value={editedName}
                            onChange={handleNameChange}
                        />
                    ) : (
                        <h4 className="text-subtitle text-background font-semibold">
                            {name}
                        </h4>
                    )}
                    <div
                        className={`relative flex gap-1 ${isEditing && `cursor-pointer`}`}
                        onClick={handleEditEndDate}
                    >
                        <CalendarIcon />
                        <p className="text-background text-caption font-light">
                            {startDate.split('-').join('.')}
                            {' - '}
                            {editedEndDate.split('-').join('.')}
                        </p>
                    </div>
                    {showCalendar && (
                        <CalendarModal
                            startDate={startDate}
                            onClose={() => setShowCalendar(false)}
                            onSelectDate={handleCalendarDateSelect}
                        />
                    )}
                </div>
                {isEditing ? (
                    <div className="flex w-1/2 justify-end">
                        <Button isCompleted onClick={handleSaveButtonClick} />
                    </div>
                ) : (
                    <button
                        className="cursor-pointer"
                        onClick={handleEditButtonClick}
                    >
                        <EditIcon className="fill-white" />
                    </button>
                )}
            </div>
        </article>
    );
};

export default TripCard;
