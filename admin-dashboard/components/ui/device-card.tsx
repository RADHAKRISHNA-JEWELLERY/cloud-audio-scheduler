
import { useMemo, useState } from "react";
import {
    Monitor,
    Music,
    Volume2,
    VolumeX,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
    updateDeviceVolume
} from "@/lib/api-client";
import debounce from "lodash/debounce"


export default function DeviceCard({ device }: any) {

    const [volume, setVolume] = useState(device.volume);

    const isOnline = device.status === "ONLINE";

    const isPlaying = device.current_state === "PLAYING";


    const debouncedUpdate = useMemo(() =>
        debounce(async (vol: number) => {

            await updateDeviceVolume(device.device_id, vol)

        }, 400)
        , [device.device_id])

    function handleChange(value: number[]) {

        const vol = value[0]

        setVolume(vol)

        debouncedUpdate(vol)

    }

    async function handleMute() {

        setVolume(0);

        await updateDeviceVolume(device.device_id, 0);

    }





    return (

        <div key={device.device_id} className={`border rounded-lg p-3 ${!isOnline && "opacity-50"}`}>

            {/* Header */}

            <div className="flex justify-between mb-2">

                <div className="flex items-center gap-2">

                    <Monitor size={14} />

                    <span className="font-semibold text-sm">

                        {device.device_name}

                    </span>

                </div>


                <span className={`text-xs font-bold ${isOnline ? "text-green-600" : "text-red-500"

                    }`}>

                    {device.status}

                </span>

            </div>


            {/* Current audio */}

            <div className="flex items-center gap-2 text-xs mb-3">

                <Music size={14} />

                {isPlaying ? device.current_audio : "Idle"}

            </div>


            {/* Volume */}

            <div className="space-y-2">

                <div className="flex justify-between text-xs">

                    <div className="flex gap-1 items-center">

                        <Volume2 size={14} />

                        {volume}%

                    </div>


                    <button

                        onClick={handleMute}

                        disabled={!isOnline}

                        className="text-xs text-red-500"

                    >

                        <VolumeX size={14} />

                    </button>

                </div>


                <Slider

                    value={[volume]}

                    max={100}

                    step={1}

                    disabled={!isOnline}

                    onValueChange={handleChange}

                />

            </div>


            {/* Controls */}

            <div className="flex gap-2 mt-3">

                {/* <button

                    onClick={handlePlay}

                    disabled={!isOnline}

                    className="control-btn"

                >

                    <Play size={14} />

                </button> */}


                {/* <button

                    onClick={handleStop}

                    disabled={!isOnline}

                    className="control-btn"

                >

                    <Square size={14} />

                </button> */}


                {/* <button

                    onClick={handleRestart}

                    disabled={!isOnline}

                    className="control-btn text-red-500"

                >

                    <RotateCcw size={14} />

                </button> */}

            </div>

        </div>

    );

}