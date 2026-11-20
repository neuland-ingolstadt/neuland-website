// Material Symbols "Sharp", filled, 24dp (CI icon style)
const Icon = ({ d }: { d: string }) => (
	<svg
		width="28"
		height="28"
		viewBox="0 -960 960 960"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d={d} />
	</svg>
)

export const Terminal = () => (
	<Icon d="M80-160v-640h800v640H80Zm176-120 56-56-104-104 104-104-56-56-160 160 160 160Zm224 0h280v-80H480v80Z" />
)
export const Code = () => (
	<Icon d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
)
export const Rocket = () => (
	<Icon d="M480-80 340-220v-200L120-200v-120l220-220v-340q0-60 70-120t70-60q0 0 70 60t70 120v340l220 220v120L620-420v200L480-80Z" />
)
export const Groups = () => (
	<Icon d="M0-240v-63q0-44 44.5-70.5T160-400q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-65 66.5-105T480-450q108 0 174 40t66 105v65H240Zm540 0v-65q0-26-6.500-49T754-397q11-2 22.500-2.500t23.500-.5q72 0 116 26.500t44 70.500v63H780ZM480-480q-50 0-85-35t-35-85q0-51 35-85.500t85-34.500q51 0 85.500 34.500T600-600q0 50-34.500 85T480-480Z" />
)
