"use client"

import { useState } from "react"
import { Volume2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@/components/ui/popover"

import { updateDeviceVolume } from "@/lib/api-client"
import type { Device } from "@/lib/types"


export function VolumeControl({ device, disabled }: { device: Device, disabled: boolean }) {

    const [volume, setVolume] = useState(device.volume)

    async function handleCommit(value: number[]) {

        const vol = value[0]

        setVolume(vol)

        await updateDeviceVolume(device.id, vol)

    }

    return (

        <Popover>

            <PopoverTrigger asChild>

                <button
                    disabled={disabled}
                    className="flex items-center gap-1 text-sm"
                >

                    <Volume2 size={16} />

                    {volume}%

                </button>

            </PopoverTrigger>

            <PopoverContent className="w-40">

                <Slider

                    value={[volume as number]}

                    max={100}

                    step={1}

                    onValueChange={(v) => setVolume(v[0])}

                    onValueCommit={handleCommit}

                />

            </PopoverContent>

        </Popover>

    )

}